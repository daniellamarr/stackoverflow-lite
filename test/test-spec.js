import { should as _should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
let should = _should();

use(chaiHttp);

let test_questions = {
    'title':'What is a noun ?',
    'body':'Elaborating '
}

let test_answers = {
    'reply':'A noun is a name of any person animal place or thing'
}

let test_user = {
    'userfullname':'Justin Nebo',
    'useremail':'jnebo@andela.com',
    'userpassword':'qwerty'
}

let test_login = {
    'useremail':'jnebo@andela.com',
    'userpassword':'qwerty'
}

let test_login_error = {
    'useremail':'dan@andela.com',
    'userpassword':'qwerty'
}
/*
* Test the /GET route
*/

describe('/GET /api/v1/questions', () => {
    it('it should GET all the questions', (done) => {
    request(server)
        .get('/api/v1/questions')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/GET /api/v1/questions/:id', () => {
    it('it should GET one of the questions', (done) => {
    request(server)
        .get('/api/v1/questions/' + 1)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});

let token;
// describe('/POST /api/v1/questions', () => {
//     before((done) => {
//         request(server)
//         .post('/api/v1/auth/login')
//         .send(test_login)
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             token = res.body.token;
//             done();
//         });
//     });

//     it('it should post a question', (done) => {
//     request(server)
//         .post('/api/v1/questions')
//         .set('x-access-token',token)
//         .send(test_questions)
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             done();
//         });
//     });
// });

// describe('/POST /api/v1/questions/:id/answers', () => {
//     before((done) => {
//         request(server)
//         .post('/api/v1/auth/login')
//         .send(test_login)
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             token = res.body.token;
//             done();
//         });
//     });
//     it('it should post an answer', (done) => {
//     request(server)
//         .post('/api/v1/questions/' + 1 + '/answers')
//         .set('x-access-token',token)
//         .send(test_answers)
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             done();
//         });
//     });
// });

describe('/POST /api/v1/auth/signup', () => {
    it('it should add a new user', (done) => {
    request(server)
        .post('/api/v1/auth/signup')
        .send(test_user)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/POST /api/v1/auth/login', () => {
    it('it should login a new user', (done) => {
    request(server)
        .post('/api/v1/auth/login')
        .send(test_login)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/POST /api/v1/auth/login', () => {
    it('it should throw a 404 error if user does not exist', (done) => {
    request(server)
        .post('/api/v1/auth/login')
        .send(test_login_error)
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
        });
    });
});