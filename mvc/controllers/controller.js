import questions from '../structures/questionStructure';

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
        if (!req.body.body || req.body.title.body < 3) {
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
}

export default new Controller;