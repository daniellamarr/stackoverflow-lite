import db from '../../db/index';
import query from '../helpers/queries';

const { queries } = query;

/**
 * Class questionController
 */
class questionController {
    /**
     * Returns all questions
     * @param {object} req Request object
     * @param {object} resp Response object
     * @returns {object} All questions
     */
    static getAllQuestions(req, resp) {
        db.connect((err, client, done) => {
            if (err) throw err
            client.query(queries.allQuestionsQuery(), (err, res) => {
                done()
            
                if (err) {
                    resp.status(500).send({
                        status: 'error',
                        message: 'Something went wrong on the server'
                    });
                } else {
                    if (res.rows.length < 1) {
                        resp.send({
                            status: 'error',
                            message: `Returned no question(s)`
                        });
                    }else{
                        resp.send({
                            status: 'success',
                            message: `Returned ${res.rows.length} question(s)`,
                            data: res.rows
                        });
                    }
                }
            })
        })
    }
    /**
     * Returns a specific question by the question id
     * @param {object} req Request object
     * @param {object} resp Response object
     * @returns {object} A specific question or returns an error object if question was not found
     */
    static getOneQuestion (req, resp) {
        db.connect((err, client, done) => {
            if (err) throw err
            client.query(queries.oneQuery(req.params.id), (err, res) => {
                done()
            
                if (err) {
                    resp.status(500).send({
                        status: 'error',
                        message: 'Something went wrong on the server'
                    });
                } else {
                    if (res.rows.length < 1) {
                        resp.send({
                            status: 'error',
                            message: `Returned no question(s)`
                        });
                    }else{
                        resp.send({
                            status: 'success',
                            message: `Returned ${res.rows.length} question(s)`,
                            data: res.rows
                        });
                    }
                }
            })
        })
    }
    /**
     * Post a question
     * @param {object} req Request object
     * @param {object} resp Response object
     * @param {object} next middleware
     */
    static askQuestion (req, resp, next) {
        db.connect((_err, client, done) => {
            if (_err) throw _err
            client.query(queries.verifyUser(req.userId), (__err, __res) => {
            done()
            if (__err) {
                resp.status(500).send({
                    status: 'error',
                    message: 'Something went wrong on the server'
                });
                return;
            }
            if (!__res) {
                resp.status(401).send({
                    status: 'error',
                    message: 'Unauthorized access'
                });
                return;
            }
                db.connect((err_, client, done) => {
                    if (err_) throw err_
                    client.query(
                        queries.askQuery(
                            req.body.title,
                            req.body.body,
                            req.userId),
                        (err__, res__) => {
                        done()
                    
                        if (err__) {
                            resp.status(500).send({
                                status: 'error',
                                message: 'Something went wrong on the server'
                            });
                        } else {
                            const [qst] = res__.rows;
                            resp.send({
                                status: 'success',
                                message: 'Your question has been posted',
                                data: {
                                    id: qst.questionid,
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
    /**
     * Deletes a question from the platform
     * @param {object} req Request object
     * @param {object} resp Response object
     * @param {object} next middleware that brings in token
     * @returns {object} A success message if question has been deleted else an error message
     */
    static deleteQuestion (req,resp,next) {
        db.connect((_err, client, done) => {
            if (_err) throw _err
            client.query(queries.verifyUser(req.userId), (__err, __res) => {
            done()
            if (__err) resp.status(500).send({
                status: 'error',
                message: 'Internal server error'
            });
            if (!__res) resp.status(401).send({
                status: 'error',
                message: 'Unauthorized access'
            });
                db.connect((err_1, client, done) => {
                    if (err_1) throw err_1
                    client.query(queries.authorQuery(
                        req.params.id,
                        req.userId
                    ), (err__1, res__1) => {
                        done()
                        if (err__1){
                            resp.status(404).send({
                                status: 'error',
                                message: 'Question was not found on the server'
                            });
                        }else{
                            if (res__1.rows.length > 0){
                                db.connect((err_, client, done) => {
                                    if (err_) throw err_
                                    client.query(queries.deleteQuery(
                                        req.params.id,
                                        req.userId
                                    ), (err__, res__) => {
                                        done()
                                    
                                        if (err__) {
                                            resp.status(500).send({
                                                status: 'error',
                                                message: 'Unable to delete this question'
                                            });
                                        } else {
                                            resp.send({
                                                status: 'success',
                                                message: 'Question has been deleted'
                                            });
                                            next();
                                        }
                                    })
                                })
                            }else{
                                resp.status(401).send({
                                    status: 'error',
                                    message: 'You are not authorized to delete this question'
                                });
                            }
                        }
                    })
                })
            })
        })
    }
}

export default questionController;