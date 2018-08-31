import db from '../../db/index';
import query from '../helpers/queries';

const { queries } = query;

/**
 * Class Answer Controller
 */
class answerController {
    /**
     * Posts an answer to a question on the platform
     * @param {object} req Request Object
     * @param {object} resp Response Object
     * @returns {object} A success message if answer has been posted
     */
    static postAnswer (req, resp) {
        if (!req.body.reply || req.body.reply.length < 1) {
            resp.status(400).send({
                status: 'error',
                message: 'Answer field cannot be left empty'
            });
            return;
        }
        db.connect((_err, client, done) => {
            if (_err) throw _err
            client.query(queries.verifyUser(req.userId), (__err, __res) => {
            done()
            if (__err) {
                resp.status(500).send({
                    status: 'error',
                    message: 'Internal server error'
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
                    client.query(queries.answerQuery(
                        req.body.reply,
                        req.params.id,
                        req.userId
                    ), (err__, res__) => {
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
                                data: res__.rows
                            });
                        }
                    })
                })
            })
        })
    }
    /**
     * Updates an answer on the platform
     * @param {object} req Request object
     * @param {object} resp Response Object
     * @returns {object} Returns a succes message if answer is posted
     */
    static updateAnswer (req,resp) {
        db.connect((_err, client, done) => {
            if (_err) throw _err
            client.query(queries.verifyUser(req.userId), (__err, __res) => {
            done()
            if (__err) resp.status(500).send({
                status: 'error',
                message: 'Internal sevrer error'
            });
            if (!__res) {
                resp.status(401).send({
                    status: 'error',
                    message: 'Unauthorized access'
                });
            }
                db.connect((err_1, client, done) => {
                    if (err_1) throw err_1
                    client.query(queries.answerAuthor(
                        req.params.ans,
                        req.userId
                    ), (err__1, res__1) => {
                        done()
                        if (err__1){
                            resp.status(500).send({
                                status: 'error',
                                message: 'Server could not retrieve answers'
                            });
                        }else{
                            const [user] = res__1.rows;
                            if (res__1.rows.length > 0){
                                db.connect((err_, client, done) => {
                                    if (err_) throw err_
                                    client.query(queries.updateAnswer(
                                        [req.body.reply,
                                        req.params.ans,
                                        req.userId]
                                    ), (err__, res__) => {
                                        done()
                                    
                                        if (err__) {
                                            resp.status(500).send({
                                                status: 'error',
                                                message: 'A server error occured'
                                            });
                                        } else {
                                            resp.send({
                                                status: 'success',
                                                message:'Answer has been updated'
                                            });
                                        }
                                    })
                                })
                            }else{
                                resp.status(401).send({
                                    status: 'error',
                                    message:'You are not authorized to update this answer'
                                });
                            }
                        }
                    })
                })
            })
        })
    }
}

export default answerController;