import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../../db/index';
import keyconfig from '../../db/keyconfig';

class Controller {
    getAllQuestions = (req, resp) => {
        db.connect((err, client, done) => {
            if (err) throw err
            client.query('SELECT * FROM questions', (err, res) => {
                done()
            
                if (err) {
                    resp.status(404).send('Questions could not be found');
                } else {
                    resp.send(res.rows);
                }
            })
        })
    }
    getOneQuestion = (req, resp) => {
        db.connect((err, client, done) => {
            if (err) throw err
            client.query('SELECT * FROM questions WHERE questionsid = $1', [req.params.id], (err, res) => {
                done()
            
                if (err) {
                    resp.status(404).send('Question could not be found');
                } else {
                    resp.send(res.rows);
                }
            })
        })
    }
    askQuestion = (req, resp, next) => {
        db.connect((_err, client, done) => {
            if (_err) throw _err
            client.query('SELECT * FROM users WHERE userid = $1', [req.userId], (__err, __res) => {
            done()
            if (__err) resp.status(500).send('Error on server');
            if (!__res) resp.status(404).send('You must be logged in to ask a question');
                db.connect((err_, client, done) => {
                    if (err_) throw err_
                    client.query('INSERT INTO questions (questiontitle, questionbody, questionuser) VALUES($1, $2, $3) RETURNING *', [req.body.title, req.body.body, req.userId], (err__, res__) => {
                        done()
                    
                        if (err__) {
                            resp.status(500).send('There was a server error');
                        } else {
                            const [user] = __res.rows;
                            resp.send(`User ${user.userfullname}, your question has been saved`);
                            next();
                        }
                    })
                })
            })
        })
    }
    postAnswer = (req, resp, next) => {
        if (!req.body.reply || req.body.reply.length < 3) {
            resp.status(400).send('Please add a reply to this question');
            return;
        }
        db.connect((_err, client, done) => {
            if (_err) throw _err
            client.query('SELECT * FROM users WHERE userid = $1', [req.userId], (__err, __res) => {
            done()
            if (__err) resp.status(500).send('Error on server');
            if (!__res) resp.status(404).send('You must be logged in to ask a question');
                db.connect((err_, client, done) => {
                    if (err_) throw err_
                    client.query('INSERT INTO answers (answersreply, answersquestion, answersuser) VALUES($1, $2, $3) RETURNING *', [req.body.reply, req.params.id, req.userId], (err__, res__) => {
                        done()
                    
                        if (err__) {
                            resp.status(500).send('There was an error posting answer');
                        } else {
                            const [user] = __res.rows;
                            resp.send(`User ${user.userfullname}, your reply has been saved`);
                        }
                    })
                })
            })
        })
    }
    userSignup = (req,resp) => {
        if (!req.body.userfullname || req.body.userfullname.length < 3) {
            resp.status(400).send('Please enter your full name');
            return;
        }
        if (!req.body.useremail || req.body.useremail.length < 3) {
            resp.status(400).send('Please provide your email address');
            return;
        }
        if (!req.body.userpassword || req.body.userpassword.length < 3) {
            resp.status(400).send('Please provide your password');
            return;
        }
        
        const password = bcrypt.hashSync(req.body.userpassword);
    
        db.connect((err, client, done) => {
            if (err) throw err
            client.query('INSERT INTO users (userfullname, useremail, userpassword) VALUES($1, $2, $3) RETURNING *', [req.body.userfullname, req.body.useremail, password], (err, res) => {
                done()
            
                if (err) {
                    resp.status(400).send('Sorry, your account was not created');
                } else {
                    const [user] = res.rows;
                    const token = jwt.sign({ id: user.userid }, keyconfig, {
                        expiresIn: 86400
                    });
                    resp.status(200).send({ auth: true, token: token });
                    // resp.send(`${req.body.useremail}, your registration was successful`);
                }
            })
        })
    }
    userLogin = (req,resp) => {
        db.connect((err, client, done) => {
            if (err) throw err
            // const email = req.body.useremail;
            client.query('SELECT * FROM users WHERE useremail = $1', [req.body.useremail], (err, res) => {
                done()
            
                if (err)  resp.status(500).send('There was an error on the server');
                
                if (res.rows.length < 1) {
                    resp.status(404).send('This email does not exist');
                }else{
                    const [user] = res.rows;
                    const password = bcrypt.compareSync(req.body.userpassword, user.userpassword);
                    if (!password) return resp.status(401).send({ auth: false, token: null });

                    const token = jwt.sign({ id: user.userid }, keyconfig, {
                        expiresIn: 86400
                    });
                    resp.status(200).send({ auth: true, token: token });
                }
            })
        })
    }
}

export default new Controller;