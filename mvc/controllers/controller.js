import questions from '../structures/questionStructure';
import answers from '../structures/answerStructure';
import users from '../structures/users';

class Controller {
    getAllQuestions = (req, res) => {
        res.send(questions);
    }
    getOneQuestion = (req, res) => {
        const question = questions.find(c => c.id === parseInt(req.params.id));
        if (!question) res.status(404).send('This question may have been deleted');
        res.send(question);
    }
    askQuestion = (req, res) => {
        if (!req.body.title || req.body.title.length < 3) {
            res.status(400).send('Please add the title for your question');
            return;
        }
        if (!req.body.body || req.body.body.length < 3) {
            res.status(400).send('Please add content to your question');
            return;
        }
    
        const question = {
            id: questions.length + 1,
            title: req.body.title,
            body: req.body.body
        };
        questions.push(question);
        res.send(question);
    }
    postAnswer = (req, res) => {
        if (!req.body.reply || req.body.reply.length < 3) {
            res.status(400).send('Please add a reply to this question');
            return;
        }
    
        const answer = {
            id: answers.length + 1,
            ref: req.params.id,
            reply: req.body.reply
        };
        answers.push(answer);
        res.send(answer);
    }
    userSignup = (req,res) => {
        if (!req.body.userfullname || req.body.userfullname.length < 3) {
            res.status(400).send('Please enter your full name');
            return;
        }
        if (!req.body.useremail || req.body.useremail.length < 3) {
            res.status(400).send('Please provide your email address');
            return;
        }
        if (!req.body.userpassword || req.body.userpassword.length < 3) {
            res.status(400).send('Please provide your password');
            return;
        }
    
        const user = {
            id: users.length + 1,
            userfullname: req.body.userfullname,
            useremail: req.body.useremail,
            userpassword: req.body.userpassword
        };
        users.push(user);
        res.send(user);
    }
    userLogin = (req,res) => {
        const user = users.find(c => c.useremail === req.body.useremail);
        if (!user) {
            res.status(404).send('This user does not exist');
        }else{
            const pass = users.find(d => d.userpassword === req.body.userpassword);
            if (!pass) {
                res.status(404).send('The password you entered is wrong');
            }else{
                res.send(user);
            }
        }
    }
}

export default new Controller;