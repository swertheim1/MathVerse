

const chai = import('../node_modules/chai/chai');
const chaiHttp = require('chai-http');

// Configure chai to use chaiHttp
// chai.use(chaiHttp);
const { expect } = chai;

// const { expect } = require('chai').use(require('chai-http'));
const app = require('../app'); 

describe('Authentication Endpoints', () => {
    it('should return 401 for login with incorrect credentials', (done) => {
        chai.request(app)
            .post('/login')
            .send({ email: 'incorrect@example.com', password: 'wrongpassword' })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it('should return 200 and a success message for successful login', (done) => {
        chai.request(app)
            .post('/login')
            .send({ email: 'correct@example.com', password: 'correctpassword' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('Login successful');
                done();
            });
    });


});
