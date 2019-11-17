/***********************************************
 * Declaration and Initialization of Variables *
 **********************************************/
const DEBUG = 0;

// Global Constant Variables
const express     =   require('express')
const path        =   require('path')
const app         =   express()
const bodyParser  =   require('body-parser')
const session     =   require('express-session')
const { Pool }    =   require('pg')
const redis       =   require('redis')
const redisStore  =   require('connect-redis')(session)
const adapter     =   require('socket.io-adapter')
const client      =   require('socket.io-client')
const parser      =   require('socket.io-parser')
const http        =   require('http').Server(app)
const io          =   require('socket.io')(http)
const PORT        =   process.env.PORT || 5000

// Other specific use variables
var pool;
pool = new Pool({
  // connectionString: process.env.DATABASE_URL
    connectionString:'postgres://postgres:password@localhost/postgres'
 //connectionString:'postgres://postgres:postgres@localhost/postgres'
});
pool.connect()
app.use(session({
  secret: 'ssshhhhh',
  store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
  saveUninitialized: false,
  resave: false
}));
//app.use(cookieParser("secretSign#143_!223"));
var sess;

//Redis Clients
var redisClient = redis.createClient()
var publish = redis.createClient()
var subscribe = redis.createClient()

/*****************************************
 * Dependencies Setup and File Structure *
 ****************************************/
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
http.listen(PORT, "127.0.0.1");
//app.use(json.bodyParser())
//app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

/****************
 * Client Pages *
 ***************/ 

/**
 * Main Page
 * @query - Table creation queries as needed
 */
app.get('/', (req, res) => {
  sess = req.session;
  var trainerQuery = tableCreator("trainer");
  var tokimonQuery = tableCreator("tokimon");
  var teamQuery = tableCreator("team");
  var moveQuery = tableCreator("move");
  var sprite = tableCreator("sprite");
  var movesprite = tableCreator("movesprite");
  redisClient.set('testkey', 'testvalue', function(err, reply) {
    if (err) console.log(err);
    console.log(reply);
  });
  pool.query(trainerQuery, (error, result) => {
  });
  res.render('pages/login');
})

/**
 * Login Page
 */
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
  var authquery = `SELECT * FROM trainer WHERE username = '${req.body.uname}'`;
  pool.query(authquery, (error, result) => {
    if (error)
      res.end(error);
    var results = result.rows;
    results.forEach((r) => {
      if(r.username === req.body.uname) {
        if(r.password != req.body.psw) {
          sess.status = "loginfailed";
          res.redirect('/login');
        }
        else {
          sess.status = "loggedin";
          if(r.admin === '1') {
            var authLogon = `SELECT * FROM trainer WHERE username = '${req.body.uname}'`;
            pool.query(authLogon, (error, result) => {
              if (error)
                res.end(error);
              sess.admin = result.rows[0].admin;
              sess.username = result.rows[0].username;
              res.redirect('/admin');
            });
          }
          else {
            var authLogon = `SELECT * FROM trainer WHERE username = '${req.body.uname}'`;
            pool.query(authLogon, (error, result) => {
              if (error)
                res.end(error);
              sess.admin = result.rows[0].admin;
              sess.username = result.rows[0].username;
              res.redirect('/landing');   
            });
          }
        }
      }
    });
  });
})

/**
 * Registration Page
 */
app.post('/register', (req, res) => {
  res.render('pages/register.ejs')
})


/**
 * loadingBattle Page
 */
app.get('/loadingBattle', (req, res) => {
  res.render('pages/loadingBattle.ejs')

// res.redirect('/battlepage_2'); 
// return;

  // var timoutObj = setTimeout(() => {
  //   console.log('timout battle video');
  //    res.redirect('/pages/login'); 

  // }, 1500);
 

})


/**
 * battlepage_2 Page
 */
app.get('/battlepage_2', (req, res) => {
  res.render('pages/battlepage_2.ejs')
})


/**
 * photo_grid 
 */
app.get('/photo_grid', (req, res) => {
  res.render('pages/photo_grid.ejs')
})

/**
 * Add Users Page
 */

app.post('/addUser', (req,res) => {
  var confirmUsername = `SELECT COUNT(*) FROM trainer WHERE username='${req.body.uname}'`;
  console.log(confirmUsername);
  
  pool.query(confirmUsername, (error, result) => {
    if (error)
      res.end(error);
    var results = result.rows;
    results.forEach((r) => {
      if(parseInt(r.count) ===0 ) {
        var addTokiQuery = `INSERT INTO trainer (username, password) VALUES ('${req.body.uname}', '${req.body.psw}')`;
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
});

/**
 * Landing Page
 */
app.get('/landing', checkLoggedIn, (req, res) => {
  res.render('pages/landing');
});


/**
 * victory Page
 */


// it now prints out the variable testValue - Next we need to make it print the user 
app.get('/victory', checkLoggedIn, (req, res) => {
  var winning_trainer = sess.username;
  // gets the date and chops out unwanted portions of information for posting to twitter  
  var timestamp = new Date();
  timestamp = timestamp.toString();
  gmt_pos = timestamp.indexOf("GMT");
  timestamp = timestamp.slice(0, gmt_pos - 1);
  // assigns values used on ejs page to display the winning user
  var results = {'status': winning_trainer}
  // creates the victory page and also passes the winning user to the ejs. (second variable)
  res.render('pages/victory', results);
  // twitter API - This tweets out the winner and when the victory happened. 
  T.post('statuses/update', {status: `${winning_trainer} won the battle on ${timestamp}!` }, function(err, data, response) {
  })
});

/**
 * loser Page
 */
app.get('/loser', checkLoggedIn, (req, res) => {
  var losing_trainer = sess.username;
  var timestamp = new Date();
  timestamp = timestamp.toString();
  gmt_pos = timestamp.indexOf("GMT");
  timestamp = timestamp.slice(0, gmt_pos - 1);
  var results = {'status': losing_trainer}
  // renders the loser page. 
  res.render('pages/loser', results);
  // Twitter API - tweets out loser info
  T.post('statuses/update', {status: `${losing_trainer} lost the battle on ${timestamp} because they didn't raise their Tokimon with love and care.` }, function(err, data, response) {
  })
});

/**
 * Logout Page
 */
app.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });
});

/************************
 * Administration Pages *
 ***********************/

/**
 * Main Admin Page
 */
app.get('/admin', checkAdmin, (req, res) => {
  var query = `SELECT * FROM trainer`;
  pool.query(query, (error, result) => {
    if (error)
      res.end(error);
    var results = {'rows': result.rows };
    res.render('pages/admin', results);
  })
});

/**
 * Trainer Display Page
 */
app.get('/admin/display/trainers', checkAdmin, (req, res) => {
  var query = `SELECT * FROM trainer`;
  pool.query(query, (error, result) => {
    if (error)
      res.end(error);
    var results = {'rows': result.rows };
    res.render('pages/admin', results);
  })
});

/**
 * Team Display Page
 */
app.get('/admin/display/teams', checkAdmin, (req, res) => {
  var query = `SELECT * FROM team`;
  pool.query(query, (error, result) => {
    if (error)
      res.end(error);
    var results = {'rows': result.rows };
    res.render('pages/admin', results);
  })
});

/**
 * Tokimon Display Page
 */
app.get('/admin/display/tokimons', checkAdmin, (req, res) => {
  var query = `SELECT * FROM tokimon`;
  pool.query(query, (error, result) => {
    if (error)
      res.end(error);
    var results = {'rows': result.rows };
    res.render('pages/admin', results);
  })
});

/**
 * Move Display Page
 */
app.get('/admin/display/moves', checkAdmin, (req, res) => {
  var query = `SELECT * FROM move`;
  pool.query(query, (error, result) => {
    if (error)
      res.end(error);
    var results = {'rows': result.rows };
    res.render('pages/admin', results);
  })
});

/********************************
 * SocketIO and Redis Functions *
 *******************************/

 /**
  * Function for listening to connections
  */
io.on('connection', (socket) => { //listening for events
	console.log('Client connected');
	socket.on('disconnect', () => {
    console.log('Client disconnected');
  })
});

redisClient.on('connect', function(){
  console.log('Redis Connection Successful');
});

/*********************
 * Utility Functions *
 ********************/

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
 * Func to check if user is logged in
 */
function checkLoggedIn(req, res, next) {
  if (sess && sess.status == 'loggedin') {
    return next();
  } else {
    res.redirect('/');
  }
}



/**
 * Function to return a table create query
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

/*********************
 * Twitter API *
 ********************/

var Twit = require('twit')

var T = new Twit({
  consumer_key:         'fUQDXW479q8xYCk3gWPsx0WbL',
  consumer_secret:      'hohfYIwnRBQdzYkNOMvmlGxSVgZl93mLc4mopLnyzB8saWI183',
  access_token:         '1193989007530610689-lmxbjSVscDQDNmAfZpd1WhORdX3HMA',
  access_token_secret:  'YztB5mHP356SNKSyNPTJkqcfisZOO3cpITa1MeBwQRCod',
})

//
//  tweet 'hello world!'
//

/** REMOVED
 * Function to return queries as needed based on arguments specified
 * @param option - enter the query command to run (create, select, insert, update, delete)
 * @param table - enter the name of the table that the query is intended to use (trainer, team, tokimon, move, sprite, movesprite)
 * @param condition - if there is a WHERE condition needed in the SQL otherwise enter ""
 * @param arguments - enter the arguments in JSON form to be created in the query other enter ""
 * @returns - desired query
 
function queryCreator(queryObject) {
var query = "";
var queryColumn = "";
var queryData = "";
switch (queryObject.option) {
  case "create":
    return tableCreator(queryObject.table);
  case "select": 
    for (const [key, value] of Object.entries(queryObject.arguments)) {
      queryColumn += `${key},`;
    }
    queryColumn = queryColumn.slice(0, -1);
    query = `SELECT ${queryColumn} FROM ${queryObject.table} ${queryObject.condition}`;
    return query;
  case "insert":
    // iterate over the JSON to create query
    for (const [key, value] of Object.entries(queryObject.arguments)) {
      queryColumn += `${key},`;
      queryData += `${value},`;
    }
    queryColumn = queryColumn.slice(0, -1); // remove last comma
    queryData = queryData.slice(0, -1); // remove last comma
    query = `INSERT INTO ${queryObject.table} (${queryColumn}) VALUES(${queryData})`;
    return query;
  case "update":
    query = `UPDATE ${queryObject.table} SET `;
    for (const [key, value] of Object.entries(queryObject.arguments)) {
      queryData += `${key}= ${value},`;
    }
    queryData = queryData.slice(0, -1); // remove last comma
    query += queryData;
    query += ` ${queryObject.condition}`;
    return query;
  case "delete":
    return `DELETE FROM ${queryObject.table} ${queryObject.condition}`;
  default:
    return "query option entered contains some error";
  }
}
*/

/***************************************
 * List of All Resources/Websites Used *
 **************************************/
/* Socket.IO

Socket.IO Homepage
https://www.npmjs.com/package/socket.io
@comments - original documentation of dependency, basic info nothing about redis
*/

 /* Redis

Redis Homepage
http://redis.js.org/
@comments - original documentation of dependency, seems confusing for a beginner

Redis Tutorial
http://programmerblog.net/nodejs-redis-tutorial/
@comments - basic redis adding/removing, contains nothing about cookies

Redis Tutorial
https://ciphertrick.com/nodejs-redis-tutorial/
@comments - basic redis, contains a little tiny bit about cookies (expiring)

Redis Tutorial
https://codeforgeek.com/using-redis-to-handle-session-in-node-js/
@comments - intermediate, useful for cookies
*/