const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const { Pool } = require('pg');
var pool;

const DEBUG = 0;

pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  // ssl: true

  connectionString:'postgres://postgres:password@localhost/postgres'
});
pool.connect();


express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({extended : false}))
  .use(bodyParser())
  .use(express.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    var alterQuery = `ALTER TABLE trainer ADD admin bit`;
    pool.query(alterQuery, (error, result) => {
      if (error)
        res.end(error);
      var results = {'rows': result.rows };
      res.render('pages/users', results)
    });
  res.render('pages/login')
  })
    
  .get('/Tokimons', (req,res) => {
    var getUsersQuery = `SELECT * FROM Tokimon`;
    pool.query(getUsersQuery, (error, result) => {
      if (error)
        res.end(error);
      var results = {'rows': result.rows };
      res.render('pages/users', results)
    });
  })  
  
  .post('/authenticate', (req,res) => {
    var authquery = `SELECT * FROM trainer WHERE username = '${req.body["uname"]}'`;
    console.log(authquery);

    pool.query(authquery, (error, result) => {



       if (error)
         res.end(error);
      var results = result.rows;
      results.forEach((r) => {

        if(r.username === req.body["uname"]) {
          if(r.password != req.body["psw"]) {
            //res.send('login failed')
            var results = {'status': "failed"}
            res.render('pages/login', results)
          }
          else {
              var authLogon = `SELECT * FROM trainer WHERE username = '${req.body["uname"]}'`;
              pool.query(authLogon, (error, result) => {
              console.log(authLogon);
                if (error)
                  res.end(error);
                console.log(result);
                var results = {'rows': result.rows };
                console.log(result);
               // var usernameObject = [username: r]

              });
              res.render('pages/landing', results)   
           // res.send('welcome user');
          }
        }
      });
    });



    if(DEBUG) {

    console.log("once again!")
    var authLogon = `SELECT * FROM trainer WHERE username = ${req.body["uname"]}`;
   
   console.log("11111111111111111111")
    setTimeout(function(){
    pool.query(authLogon, (error, result) => {
            console.log("test%%%%%%%%%%%%%%") 
      if (error)
            console.log("test$$$$$$$$$$$")
            //console.log(result)
        res.end(error);
            console.log("test&&&&&&&")

      var results = {'rows': result.rows };
      console.log("here!");
      //res.send('wrong passwprd')
      
  });
    console.log("222222222222222")

      res.send('welcome user');


  console.log("333333333333333333")

  }, 1000)
  }
})

.post('/register', (req, res) => {
  
    res.render('pages/register.ejs')
})

.post('/addUser', (req,res) => {
    var addTokiQuery = `INSERT INTO trainer (username, password) VALUES ('${req.body["uname"]}', '${req.body["psw"]}')`;
    console.log(addTokiQuery);
    pool.query(addTokiQuery, (error, result) => {
      if (error)
        res.end(error);
      // var results = {'rows': result.rows };
      res.render('pages/login');
    });
  })

  

  .post('/delete', (req,res) => { 
    var deleteTokiQuery = `DELETE FROM Tokimon WHERE id='${req.body["tokiID"]}'`;
    console.log(deleteTokiQuery);
    pool.query(deleteTokiQuery, (error) => {
      if (error)
        res.end(error);
      console.log('Hello');
      res.redirect(301, `/Tokimons`);
    });
  })

  .get('/selectToModify', (req, res) => res.redirect(301, `/Tokimons`))
  .post('/selectToModify', (req,res) => {
    var searchTokiQuery = `SELECT * FROM Tokimon WHERE id='${req.body["tokiID"]}'`;
    pool.query(searchTokiQuery, (error, result) => {
      if (error)
        res.end(error);
      console.log('Hello post method /select modify');
      var searchResults = {'rows': result.rows };
      res.render('pages/modify', searchResults);
      });
  })

  .get('/modify', (req, res) => res.redirect(301, `/Tokimons`)) 

  .post('/modify', (req,res) => {
    var total = parseInt(`${req.body["tokimonWeight"]}`) + parseInt(`${req.body["tokimonHeight"]}`) + parseInt(`${req.body["tokimonFly"]}`) + parseInt(`${req.body["tokimonFight"]}`) + parseInt(`${req.body["tokimonFire"]}`) + parseInt(`${req.body["tokimonWater"]}`) + parseInt(`${req.body["tokimonElectric"]}`) + parseInt(`${req.body["tokimonFrozen"]}`);
    var updateTokiQuery = `UPDATE Tokimon SET t_name='${req.body["tokimonName"]}', t_weight='${req.body["tokimonWeight"]}', t_height='${req.body["tokimonHeight"]}', t_fly='${req.body["tokimonFly"]}', t_fight='${req.body["tokimonFight"]}', t_fire='${req.body["tokimonFire"]}', t_water='${req.body["tokimonWater"]}', t_electric='${req.body["tokimonElectric"]}', t_frozen='${req.body["tokimonFrozen"]}', t_trainer='${req.body["tokimonTrainer"]}', t_total='${total}', t_desc='${req.body["tokimonDescription"]}' WHERE id='${req.body["tokimonID"]}'`;
    console.log(updateTokiQuery);
    pool.query(updateTokiQuery, (error) => {
      if (error)
        res.end(error);
      res.redirect(301, `/Tokimons`);
    });
  })

  
  .get('/moreinfo', (req, res) => res.redirect(301, `/Tokimons`))

  .post('/moreinfo', (req,res) => {
    var searchTokiQuery = `SELECT * FROM Tokimon WHERE id='${req.body["tokiID"]}'`;
    pool.query(searchTokiQuery, (error, result) => {
      if (error)
        res.end(error);
      var searchResults = {'rows': result.rows };
      res.render('pages/moreinfo', searchResults);
      });
  })
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
