import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../../db/index';
import keyconfig from '../../db/keyconfig';
import query from '../helpers/queries';

const { queries } = query;

/**
 * Class User Controller
 */
class userController {
    /**
     * Signs up a user on the platform
     * @param {object} req Request object
     * @param {object} resp Response object
     */
    static userSignup (req,resp) {
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
            client.query(queries.signupQuery(
                req.body.userfullname,
                req.body.useremail,
                password
            ), (err, res) => {
                done()
            
                if (err) {
                    resp.status(400).send({
                        status: 'error',
                        message: 'Account was not created'
                    });
                } else {
                    const [user] = res.rows;
                    const token = jwt.sign({id: user.userid }, keyconfig, {
                        expiresIn: 86400
                    });
                    resp.status(200).send({
                        token: token,
                        message: 'Account created',
                        data: {
                            id: user.userid,
                            userfullname: user.userfullname,
                            useremail: user.useremail
                        }
                    });
                }
            })
        })
    }
    /**
     * Login a user on the platform
     * @param {object} req Request Object
     * @param {object} resp Response Object
     * @returns {object} Returns the data of the user that just logged in
     */
    static userLogin (req,resp) {
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
            client.query(queries.loginQuery(
                req.body.useremail
            ), (err, res) => {
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
                    const password = bcrypt.compareSync(
                        req.body.userpassword,
                        user.userpassword
                    );
                    if (!password) return resp.status(401).send({
                        status: 'errror',
                        message: 'Email or password is incorrect'
                    });

                    const token = jwt.sign({ id: user.userid }, keyconfig, {
                        expiresIn: 86400
                    });
                    resp.status(200).send({
                        token: token,
                        message: 'You are logged in',
                        data: {
                            id: user.userid,
                            userfullname: user.userfullname,
                            useremail: user.useremail
                        }
                    });
                }
            })
        })
    }
}

export default userController;