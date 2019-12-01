var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();
var expect = chai.expect;
var request = require('supertest');
var knex = require('../db/knex');
var sinon = require('sinon');
var ejs = require('ejs');
chai.use(chaiHttp);

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

    it('should return 4 database entries for this test and a proper database record / GET', function(done) {
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

describe('login and logout', function() {
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

    it('should automatically bring you to the login page / GET', function(done) {
        request(server).get('/').expect('Location','/login').end(done)
    });
    
    it('should not allow a login without logging in / GET', function(done){
        request(server).get('/landing/notadmin').expect('Location','/login').end(done)
    });

    it('should not allow access to admin page without login / GET', function(done){
        request(server).get('/admin').expect('Location','/login').end(done)
    });

    it('should not allow login with wrong username but right password / GET', function(done){
        request(server).post('/authenticate').send({'uname':'wrongusername','psw':'password'}).expect('Location','login').end(done)
    });

    it('should now allow login with correct username but wrong password / GET', function(done){
        request(server).post('/authenticate').send({'uname':'notadmin','psw':'badpassword'}).expect('Location','/login').end(done)
    });

    it('should allow login with correct username and password / GET', function(done){
        request(server).post('/authenticate').send({'uname':'notadmin','psw':'password'}).expect('Location','/landing/notadmin').end(done)
    });

    it('should allow admin access with admin account / GET', function(done){
        request(server).post('/authenticate').send({'uname':'admin','psw':'password'}).expect('Location','/admin').end(done)
    });

    it('will register a new user but fail due to existing user and ask them to register again / GET', function(done) {
        var spy = sinon.spy(ejs, '__express');
        request(server)
            .post('/addUser')
            .send({ uname: 'notadmin', psw: 'password' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(spy.calledWithMatch(/\/register\.ejs$/)).to.be.true;
                spy.restore();
                done();
            });
    }); 

    it('will register a new user and bring them to the login page / GET', function(done) {
        var spy = sinon.spy(ejs, '__express');
        request(server)
            .post('/addUser')
            .send({ uname: 'aaa111', psw: 'password' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(spy.calledWithMatch(/\/register\.ejs$/)).to.be.false;
                spy.restore();
                done();
            });
    }); 

    it('will log out', function(done) {
        request(server).post('/authenticate').send({'uname':'notadmin','psw':'password'}).expect('Location','/landing/notadmin').end(function() {
            request(server).get('/logout').expect('Location','/').end(done);
        }); 
    });
});

describe('battlepage', function() {
    this.timeout(5000);
    it('will go from battle scene to battle page / GET', function(done) {
        request(server).get('/loadingBattle').expect('Location','/battle_page2').end(function() {
            setTimeout(done, 3000);
        });
    });
});