/**
 * Variable Declarations
 */

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const socketIO = require('socket.io')
const io = socketIO(server) //create a socketIO server

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
pool.connect();

// For turning on and off console.log commands
var debug = true; 

/**
 * Node.js Express Setup
 */

var app = express();
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended : false}))
app.use(bodyParser())
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/**
 * SocketIO Connection
 */

// Example from Class
io.on('connection', (socket) => { // listening for events
  if (debug) 
    Console.log('Client connected');
	Socket.on('disconnect', () => console.log('Client disconnected'));
	Socket.on('chat', function(message) { // chat = event (from HTML)
		Console.log("chat message: " + message);
		io.emit('message', message); // broadcast message event, emit message to all clients
	});
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000); //listening for event on client-side every second by sending new time/string object

// End of Example

/**
 * Main Page 
 * @query - Creates tables in database if they do not exist (several queries)
 * @render - Render the main page
 */

app.get('/', (req, res) => {
  var createTrainerTableQuery = 
    `CREATE TABLE IF NOT EXISTS trainers
      (username varchar(20) PRIMARY KEY, 
      password varchar(20) NOT NULL, 
      )`

  pool.query(createTrainerTableQuery, (error, result) => {
    if(error) 
      res.end(error);
  });

  res.render('tokimon.ejs')
});

/*
  // Old Stuff
  app.get('/Tokimons', (req,res) => {
    var getUsersQuery = `SELECT * FROM Tokimon`;
    pool.query(getUsersQuery, (error, result) => {
      if (error)
        res.end(error);
      var results = {'rows': result.rows };
      res.render('pages/users', results)
    });
  })  
  
  .post('/add', (req,res) => {
    var total = parseInt(`${req.body["tokimonWeight"]}`) + parseInt(`${req.body["tokimonHeight"]}`) + parseInt(`${req.body["tokimonFly"]}`) + parseInt(`${req.body["tokimonFight"]}`) + parseInt(`${req.body["tokimonFire"]}`) + parseInt(`${req.body["tokimonWater"]}`) + parseInt(`${req.body["tokimonElectric"]}`) + parseInt(`${req.body["tokimonFrozen"]}`);
    var addTokiQuery = `INSERT INTO Tokimon (t_name, t_weight, t_height, t_fly, t_fight, t_fire, t_water, t_electric, t_frozen, t_trainer, t_total, t_desc) VALUES ('${req.body["tokimonName"]}', '${req.body["tokimonWeight"]}', '${req.body["tokimonHeight"]}', '${req.body["tokimonFly"]}', '${req.body["tokimonFight"]}', '${req.body["tokimonFire"]}', '${req.body["tokimonWater"]}', '${req.body["tokimonElectric"]}', '${req.body["tokimonFrozen"]}', '${req.body["tokimonTrainer"]}', '${total}', '${req.body["tokimonDescription"]}') RETURNING id`;
    console.log(addTokiQuery);
    pool.query(addTokiQuery, (error, result) => {
      if (error)
        res.end(error);
      var results = {'rows': result.rows };
      res.redirect(301, `/Tokimons`);
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
  
  var createSpriteTableQuery = 
    `CREATE TABLE IF NOT EXISTS tokimons 
      (spriteid serial PRIMARY KEY, 
      spritename varchar(20),
      frontsprite int UNIQUE,
      backsprite int UNIQUE REFERENCES sprites(spriteid),
      )`

  var createTokimonTableQuery = 
    `CREATE TABLE IF NOT EXISTS tokimons 
      (tokimonid serial PRIMARY KEY, 
        tokimonname varchar(20), 
        hp int, 
        attack int, 
        defense int,
        flying int, 
        fighting int, 
        fire int, 
        water int, 
        electric int, 
        ice int, 
        total int,
        frontsprite int UNIQUE REFERENCES sprites(spriteid),
        backsprite int UNIQUE REFERENCES sprites(spriteid),
        )`


  pool.query(createTokimonQuery, (error, result) => {
  });

  var createTrainerQuery = 
    `CREATE TABLE IF NOT EXISTS trainers
      (trainerid serial PRIMARY KEY, 
        name varchar(20), 
        password varchar(20), 
        email varchar(50)
        )`
  pool.query(createTrainerQuery, (error, result) => {
  });

  var createTeamsQuery = 
    `CREATE TABLE IF NOT EXISTS teams
      (teamid serial PRIMARY KEY, 
        trainerid int REFERENCES trainers(trainerid),
        tokimon1 int REFERENCES tokimons(tokimonid) UNIQUE,
        tokimon2 int REFERENCES tokimons(tokimonid) UNIQUE,
        tokimon3 int REFERENCES tokimons(tokimonid) UNIQUE,
        tokimon4 int REFERENCES tokimons(tokimonid) UNIQUE,
        tokimon5 int REFERENCES tokimons(tokimonid) UNIQUE,
        tokimon6 int REFERENCES tokimons(tokimonid) UNIQUE
        )`
  pool.query(createTrainerQuery, (error, result) => {
  });
*/