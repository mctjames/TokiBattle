var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();
var expect = chai.expect;
var request = require('supertest');
chai.use(chaiHttp);

describe('login', function() {
    it('should automatically bring you to the login page / GET', function(done) {
        chai.request(server).get('/').end(function(err, res){
            if (err) {
                done(err);
            }
            expect(res).to.redirectTo('http://127.0.0.1:5001/login');
            res.should.have.status(200);
            done();
        });
    });

    
})