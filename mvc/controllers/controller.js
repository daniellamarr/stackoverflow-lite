import questions from '../structures/questionStructure';

class Controller {

    getAllQuestions = (req, res) => {
        res.send(questions);
    }

}

export default new Controller;