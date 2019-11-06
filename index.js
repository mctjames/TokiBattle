/**
 * Declaration and Initialization of Variables
 */
const DEBUG = 0;
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const session = require('express-session')
const { Pool } = require('pg');
var pool;
pool = new Pool({
  // connectionString: process.env.DATABASE_URL
  connectionString:'postgres://postgres:password@localhost/postgres'
});
pool.connect();

/** 
 * Dependencies Setup and File Structure
 */
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended : false}))
app.use(bodyParser())
app.use(express.json())
app.use(session({secret: 'shh'}))  // For session handling
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
var sess;

/**
 * Client Pages
 */ 

app.get('/', (req, res) => {
  pool.query(queryCreator("create", "trainer", "", ""), (error, result) => {
  });
  res.render('pages/login');
})
  
app.get('/login', (req,res) => {
  var results;
  if (sess) {
    if (sess.status == "loginfailed") {
      results = {'status':"Your username or password could not be verified. Please try again."};
      res.render('pages/login', results);
    }
    else {
      res.render('pages/login');
    }
  } 
  else {
    res.render('pages/login');
  }
})

/**
 * Authentication Page
 * @success - If user is admin, redirect to admin page. Otherwise redirect to landing page
 * @failure - If bad username or password, reload login page with error message
 */
app.post('/authenticate', (req,res) => {
  var authquery = `SELECT * FROM trainer WHERE username = '${req.body["uname"]}'`;
  pool.query(authquery, (error, result) => {
    if (error)
      res.end(error);
    var results = result.rows;
    sess = req.session;
    results.forEach((r) => {
      if(r.username === req.body["uname"]) {
        if(r.password != req.body["psw"]) {
          sess.status = "loginfailed";
          res.redirect('/login');
        }
        else {
          sess.status = "loggedin";
          if(r.admin === '1') {
            var authLogon = `SELECT * FROM trainer WHERE username = '${req.body["uname"]}'`;
            pool.query(authLogon, (error, result) => {
              if (error)
                res.end(error);
              sess.admin = result.rows[0].admin;
              res.redirect('/admin');
            });
          }
          else {
            var authLogon = `SELECT * FROM trainer WHERE username = '${req.body["uname"]}'`;
            pool.query(authLogon, (error, result) => {
              if (error)
                res.end(error);
              res.redirect('/landing');   
            });
          }
        }
      }
    });
  });
})

app.post('/register', (req, res) => {
  res.render('pages/register.ejs')
})

app.post('/addUser', (req,res) => {
  var confirmUsername = `SELECT COUNT(*) FROM trainer WHERE username='${req.body["uname"]}'`;
  console.log(confirmUsername);
  
  pool.query(confirmUsername, (error, result) => {
    if (error)
      res.end(error);
    var results = result.rows;
    results.forEach((r) => {
      if(parseInt(r.count) ===0 ) {
        var addTokiQuery = `INSERT INTO trainer (username, password) VALUES ('${req.body["uname"]}', '${req.body["psw"]}')`;
        console.log(addTokiQuery);
        pool.query(addTokiQuery, (error, result) => {
        if (error)
          res.end(error);
        res.render('pages/login');
        });
      }
      else {
        var results = {'status': "Username taken"}
        res.render('pages/register', results)
      }
    })
    console.log(results);
  });
  
})

/**
 * Administration Pages
 */


app.get('/admin', checkAdmin, (req, res) => {
  var query = queryCreator("select", "trainer", "true", {"*":""});
  pool.query(query, (error, result) => {
    if (error)
      res.end(error);
    var results = {'rows': result.rows };
    res.render('pages/admin', results);
  })
});

app.get('/landing', (req, res) => {
  res.render('pages/landing');
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

// Utility Functions

/**
 * Function to check admin privleges
 */
function checkAdmin(req, res, next) {
    if (sess && sess.admin == '1') {
      return next();
    } else {
      res.redirect('/');
    }
  }

/**
 * Function to return queries as needed based on arguments specified
 * @param option - enter the query command to run (create, select, insert, update, delete)
 * @param table - enter the name of the table that the query is intended to use (trainer, team, tokimon, move, sprite, movesprite)
 * @param condition - if there is a WHERE condition needed in the SQL otherwise enter ""
 * @param arguments - enter the arguments in JSON form to be created in the query
 * @returns - desired query
 */
function queryCreator(option, table, condition, arguments) {

var query = "";
var queryColumn = "";
var queryData = "";
switch (option) {
  case "create":
    return tableCreator(table);
  case "select":    
    for (const [key, value] of Object.entries(arguments)) {
      queryColumn += `${key},`;
    }
    queryColumn = queryColumn.slice(0, -1);
    query = `SELECT ${queryColumn} FROM ${table} WHERE ${condition}`;
    return query;
  case "insert":
    // iterate over the JSON to create query
    for (const [key, value] of Object.entries(arguments)) {
      queryColumn += `${key},`;
      queryData += `${value},`;
    }
    queryColumn = queryColumn.slice(0, -1); // remove last comma
    queryData = queryData.slice(0, -1); // remove last comma
    query = `INSERT INTO ${table} (${queryColumn}) VALUES(${queryData})`;
    return query;
  case "update":
    query = `UPDATE ${table} SET `;
    for (const [key, value] of Object.entries(arguments)) {
      queryData += `${key}= ${value},`;
    }
    queryData = queryData.slice(0, -1); // remove last comma
    query += queryData;
    query += ` WHERE ${condition}`;
    return query;
  case "delete":
    return `DELETE FROM ${table} WHERE ${condition}`;
  default:
    return "query option entered contains some error";
  }
}

/**
 * Companion Function to return a table create query
 * @param - enter the table to create
 * @returns - the table creation query as needed
 */

function tableCreator(table) {
var size = "20";
switch (table) {
  case "trainer":
    return `CREATE TABLE IF NOT EXISTS trainer (username varchar(20) PRIMARY KEY, password varchar(20), admin bit)`;
  case "team":
    return `CREATE TABLE IF NOT EXISTS team 
    (teamname varchar(${size}) PRIMARY KEY, 
    tokimon1 int UNIQUE REFERENCES tokimon(id), 
    tokimon2 int UNIQUE REFERENCES tokimon(id), 
    tokimon3 int UNIQUE REFERENCES tokimon(id), 
    tokimon4 int UNIQUE REFERENCES tokimon(id), 
    tokimon5 int UNIQUE REFERENCES tokimon(id), 
    tokimon6 int UNIQUE REFERENCES tokimon(id), 
    trainername varchar(${size}) REFERENCES trainer(username))`;
  case "tokimon":
    return `CREATE TABLE IF NOT EXISTS tokimon 
    (tokimonid serial PRIMARY KEY,
    tokimonname varchar(${size}) NOT NULL,
    flying int NOT NULL, 
    fighting int NOT NULL,
    fire int NOT NULL,
    water int NOT NULL,
    electric int NOT NULL,
    ice int NOT NULL,
    hp int NOT NULL,
    attack int NOT NULL,
    defense int NOT NULL,
    move1 varchar(${size}) NOT NULL REFERENCES move(movename),
    move2 varchar(${size}) NOT NULL REFERENCES move(movename),
    move3 varchar(${size}) NOT NULL REFERENCES move(movename),
    move4 varchar(${size}) NOT NULL REFERENCES move(movename),
    frontsprite varchar(${size}) NOT NULL REFERENCES sprite(spritename),
    backsprite varchar(${size}) NOT NULL REFERENCES sprite(spritename))`;
  case "move":
    return `CREATE TABLE IF NOT EXISTS move
    (movename varchar(${size}) PRIMARY KEY,
    movetype varchar(${size}) NOT NULL,
    power int NOT NULL,
    uses int NOT NULL,
    accuracy int NOT NULL,
    frontmovesprite varchar(${size}),
    backmovesprite varchar(${size}))`;
  case "sprite":
    return `CREATE TABLE IF NOT EXISTS sprite
    (spritename varchar(${size}))`;
  case "movesprite":
    return `CREATE TABLE IF NOT EXISTS movesprite
    (movespritename varchar(${size}))`;
  default:
    return "bad create table entered";
  }
}