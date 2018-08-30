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
                    resp.status(404).send({
                        status: 'error',
                        message: 'Questions could not be found'
                    });
                } else {
                    resp.send(res.rows);
                }
            })
        })
    }
    getOneQuestion = (req, resp) => {
        db.connect((err, client, done) => {
            if (err) throw err
            client.query('SELECT * FROM questions WHERE questionid = $1', [req.params.id], (err, res) => {
                done()
            
                if (err) {
                    resp.status(404).send({
                        status: 'error',
                        message: 'Question could not be found'
                    });
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
            if (__err) {
                resp.status(500).send({
                    status: 'error',
                    message: 'Internal server error'
                });
                return;
            }
            if (!__res) {
                resp.status(403).send({
                    status: 'error',
                    message: 'You need to be logged in to access this page'
                });
                return;
            }
                db.connect((err_, client, done) => {
                    if (err_) throw err_
                    client.query('INSERT INTO questions (questiontitle, questionbody, questionuser) VALUES($1, $2, $3) RETURNING *', [req.body.title, req.body.body, req.userId], (err__, res__) => {
                        done()
                    
                        if (err__) {
                            resp.status(500).send({
                                status: 'error',
                                message: 'Your account was not created'
                            });
                        } else {
                            const [user] = __res.rows;
                            resp.send({
                                status: 'success',
                                message: 'Your question has been posted',
                                data: {
                                    title: req.body.title,
                                    body: req.body.body
                                }
                            });
                            next();
                        }
                    })
                })
            })
        })
    }
    postAnswer = (req, resp, next) => {
        if (!req.body.reply || req.body.reply.length < 1) {
            resp.status(400).send({
                status: 'error',
                message: 'Answer field cannot be left empty'
            });
            return;
        }
        db.connect((_err, client, done) => {
            if (_err) throw _err
            client.query('SELECT * FROM users WHERE userid = $1', [req.userId], (__err, __res) => {
            done()
            if (__err) {
                resp.status(500).send({
                    status: 'error',
                    message: 'Internal server error'
                });
                return;
            }
            if (!__res) {
                resp.status(403).send({
                    status: 'error',
                    message: 'You need to be logged in to access this page'
                });
                return;
            }
                db.connect((err_, client, done) => {
                    if (err_) throw err_
                    client.query('INSERT INTO answers (answersreply, answersquestion, answersuser) VALUES($1, $2, $3) RETURNING *', [req.body.reply, req.params.id, req.userId], (err__, res__) => {
                        done()
                    
                        if (err__) {
                            resp.status(500).send({
                                status: 'error',
                                message: 'Your answer was not saved'
                            });
                        } else {
                            const [user] = __res.rows;
                            resp.send({
                                status: 'success',
                                message: 'Your answer has been saved',
                                data: {
                                    reply: req.body.reply
                                }
                            });
                        }
                    })
                })
            })
        })
    }
    userSignup = (req,resp) => {
        if (!req.body.userfullname || req.body.userfullname.length < 3) {
            resp.status(400).send({
                status: 'error',
                message: 'Name field cannot be left empty'
            });
            return;
        }
        if (!req.body.useremail || req.body.useremail.length < 3) {
            resp.status(400).send({
                status: 'error',
                message: 'Email field cannot be left empty'
            });
            return;
        }
        if (!req.body.userpassword || req.body.userpassword.length < 3) {
            resp.status(400).send({
                status: 'error',
                message: 'Password field cannot be left empty'
            });
            return;
        }
        
        const password = bcrypt.hashSync(req.body.userpassword);
    
        db.connect((err, client, done) => {
            if (err) throw err
            client.query('INSERT INTO users (userfullname, useremail, userpassword) VALUES($1, $2, $3) RETURNING *', [req.body.userfullname, req.body.useremail, password], (err, res) => {
                done()
            
                if (err) {
                    resp.status(400).send({
                        status: 'error',
                        message: 'Account was not created'
                    });
                } else {
                    const [user] = res.rows;
                    const token = jwt.sign({ id: user.userid }, keyconfig, {
                        expiresIn: 86400
                    });
                    resp.status(200).send({
                        token: token,
                        message: 'Account created',
                        data: {
                            userfullname: user.userfullname,
                            useremail: user.useremail
                        }
                    });
                }
            })
        })
    }
    userLogin = (req,resp) => {
        if (!req.body.useremail || req.body.useremail.length < 3) {
            resp.status(400).send({
                status: 'error',
                message: 'Email field cannot be left empty'
            });
            return;
        }
        if (!req.body.userpassword || req.body.userpassword.length < 3) {
            resp.status(400).send({
                status: 'error',
                message: 'Password field cannot be left empty'
            });
            return;
        }
        db.connect((err, client, done) => {
            if (err) throw err
            client.query('SELECT * FROM users WHERE useremail = $1', [req.body.useremail], (err, res) => {
                done()
            
                if (err) {
                    resp.status(500).send({
                        status: 'error',
                        message: 'Internal server error'
                    });
                }
                
                if (res.rows.length < 1) {
                    resp.status(404).send({
                        status: 'error',
                        message: 'Email does not exist'
                    });
                }else{
                    const [user] = res.rows;
                    const password = bcrypt.compareSync(req.body.userpassword, user.userpassword);
                    if (!password) return resp.status(401).send({ auth: false, token: null });

                    const token = jwt.sign({ id: user.userid }, keyconfig, {
                        expiresIn: 86400
                    });
                    resp.status(200).send({
                        token: token,
                        message: 'You are logged in',
                        data: {
                            userfullname: user.userfullname,
                            useremail: user.useremail
                        }
                    });
                }
            })
        })
    }
}

export default new Controller;