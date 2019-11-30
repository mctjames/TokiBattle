var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();
var expect = chai.expect;
var request = require('supertest');
var knex = require('../db/knex');
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

    it('should not allow a login / GET', function(done){
        chai.request(server).get('/landing/notadmin').end(function(err, res){
            if (err) {
                done(err);
            }
            expect(res).to.redirect;
            res.should.have.status(200);
            done();
        });
    });
});

describe('database', function() {

    beforeEach(function(done) {
        knex.migrate.rollback().then(function() {
            knex.migrate.latest().then(function() {
                return knex.seed.run()
            .then(function() {
                done();
            });
            });
        });
    });

    afterEach(function(done) {
        knex.migrate.rollback().then(function() {
          done();
        });
    });

    it('should return 4 users for this test / GET', function(done) {
      chai.request(server).get('/trainer').end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(4);
        res.body[0].should.have.property('username');
        res.body[0].username.should.equal('admin');
        res.body[0].should.have.property('password');
        res.body[0].password.should.equal('password');
        res.body[0].should.have.property('admin');
        res.body[0].admin.should.equal('1');
        done();
      });
    });
  });