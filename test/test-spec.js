import { should as _should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
let should = _should();

use(chaiHttp);

let test_questions = {
    'title':'What is a noun ?',
    'body':'Elaborating'
}

let test_answers = {
    'reply':'A noun is a name of any person animal place or thing'
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
            res.body.should.be.a('array');
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

describe('/POST /api/v1/questions', () => {
    it('it should post a question', (done) => {
    request(server)
        .post('/api/v1/questions')
        .send(test_questions)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('/POST /api/v1/questions/:id/answers', () => {
    it('it should post an answer', (done) => {
    request(server)
        .post('/api/v1/questions/' + 1 + '/answers')
        .send(test_answers)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});