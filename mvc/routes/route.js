import questionController from "../controllers/questionController";
import answerController from "../controllers/answerController";
import userController from "../controllers/userController";
import tokendecode from "../controllers/tokendecode";

const Route = (app) => {

    app.get('/api/v1/questions', questionController.getAllQuestions);

    app.get('/api/v1/questions/:id', questionController.getOneQuestion);

    app.post('/api/v1/questions', tokendecode, questionController.askQuestion);

    app.post('/api/v1/questions/:id/answers', tokendecode, answerController.postAnswer);

    app.post('/api/v1/auth/signup', userController.userSignup);

    app.post('/api/v1/auth/login', userController.userLogin);

    app.delete('/api/v1/questions/:id', tokendecode, questionController.deleteQuestion)

    app.put('/api/v1/questions/:id/answers/:ans', tokendecode, answerController.updateAnswer);

}

export default Route;