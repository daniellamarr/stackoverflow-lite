/**
 * SQLQueries for routes
 */
const queries = {
    /**
     * 
     * @param {string} userid User id to be verified
     */
    verifyUser (userid) {
        return {
            text: 'SELECT * FROM users WHERE userid = $1',
            values: [userid]
        };
    },
    /**
     * 
     * @param {string} question ID of the specified question
     * @param {int} user ID of the question author
     */
    authorQuery (question,user) {
        return {
            text: `SELECT * FROM questions
            WHERE questionid = $1 AND questionuser = $2`,
            values: [question,user]
        }
    },
    allQuestionsQuery () {
        return `SELECT * FROM questions`;
    },
    askQuery (title,body,user) {
        return {
            text: `INSERT INTO questions
            (questiontitle, questionbody, questionuser)
            VALUES($1, $2, $3) RETURNING *`,
            values: [title,body,user]
        };
    },
    oneQuery (question) {
        return {
            text: `SELECT * FROM questions
            WHERE questionid = $1`,
            values: [question]
        };
    },
    deleteQuery (question,user) {
        return {
            text: `DELETE FROM questions
            WHERE questionid = $1
            AND questionuser = $2`,
            values: [question,user]
        };
    },
    answerQuery (reply,question,user) {
        return {
            text: `INSERT INTO answers
            (
                answersreply,
                answersquestion,
                answersuser,
                answersqowner
            )
            VALUES($1, $2, $3, $4) RETURNING *`,
            values: [reply,question,user,0]
        }
    },
    answerAuthor (answer,user) {
        return {
            text: `SELECT * FROM answers
            WHERE answersid = $1 AND answersuser = $2`,
            values: [answer,user]
        }
    },
    updateAnswer (reply,answer,user) {
        return {
            text: `UPDATE answers 
            SET answersreply = $1 
            WHERE answersid = $2 AND answersuser = $3`,
            values: [reply,answer,user]
        }
    },
    signupQuery (name,email,password) {
        return {
            text: `
            INSERT INTO users
            (
                userfullname,
                useremail,
                userpassword
            )
            VALUES($1, $2, $3) RETURNING *`,
            values: [name,email,password]
        }
    },
    loginQuery (email) {
        return {
            text: `
            SELECT * FROM users 
            WHERE useremail = $1`,
            values: [email]
        }
    }
};

export default {queries};