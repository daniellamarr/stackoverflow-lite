import Controller from "../controllers/jwtcontroller";
import tokendecode from "../controllers/tokendecode";

const Route = (app) => {

    app.get('/api/v1/questions', Controller.getAllQuestions);

    app.get('/api/v1/questions/:id', Controller.getOneQuestion);

    app.post('/api/v1/questions', tokendecode, Controller.askQuestion);

    app.post('/api/v1/questions/:id/answers', tokendecode, Controller.postAnswer);

    app.post('/api/v1/auth/signup', Controller.userSignup);

    app.post('/api/v1/auth/login', Controller.userLogin);

}

export default Route;