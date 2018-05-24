 //import restify module
 var restify = require('restify');
 //import our user module which handles all CRUD operations on users
 var user = require('./user');

 var Details = require('./Details');

 var Tickets = require('./Tickets');

 //import our database module which handles most of general db operations
 var db = require('./database');

 //create the restify module
 const server = restify.createServer()
 const corsMiddleware = require('restify-cors-middleware')

 //add 'Authorization' to allowHeader to tell preflight browser OPTION request that basic auth is allowed
 const cors = corsMiddleware({
     preflightMaxAge: 5, //Optional
     origins: ['http://localhost:8000'],
     credentials: true,
     allowHeaders: ['API-Token', 'Authorization'],
     exposeHeaders: ['API-Token-Expiry'],

 })


 server.pre(cors.preflight)
 server.use(cors.actual)

 //initialise the server with required plugins
 server.use(restify.plugins.fullResponse())
 server.use(restify.plugins.bodyParser());
 server.use(restify.plugins.queryParser())
 server.use(restify.plugins.authorizationParser())

 //prepare our database connection parameters
 const databaseData = {
     host: "sql2.freemysqlhosting.net",
     user: "sql2207267",
     password: "lD3!zY8!",
     database: "sql2207267"
 };
 //save server port on global variable
 var port = 8080;

 //route any requests to http://localhost:8080/user/add to this function
 server.post('/user/add', (req, res) => {
     //we are atempting to add a user
     user.add(databaseData, req, function(err, data) {
         //when adding a user is done this code will run
         //if we got an error informs the client and set the proper response code
         if (err) {
             res.status(400);
             res.end("error:" + err);
         }
         //if no error let's set proper response code and have a party
         res.status(201);
         res.end("success");
     });
 })


 server.post('/users/login', (req, res) => {

     //we are atempting to add a user
     user.login(databaseData, req, function(err, data) {

         //when adding a user is done, this code will run
         //if we got an error informs the client and set the proper response code
         if (err) {
             //set status bad request
             res.status(400);
             res.end(JSON.stringify(err));
             return;
         }
         //if no error let's set proper response code and have a party
         if (data.value == 1) {
             //set status OK
             res.status(200);
         } else {
             //set status unauthorised
             res.status(401);
         }

         res.end(JSON.stringify(data));

     });
 })

 server.post('/user/createcomment', (req, res) => {
     //we are atempting to add comment information
     Details.createcomment(databaseData, req, function(err, data) {
         //if we got an error informs the client and set the proper response code
         if (err) {
             res.status(400);
             res.end("error:" + err);
         }
         //if no error let's set proper response code and have a party
         res.status(201);
         res.end("success");
     });
 })

 server.post('/user/createticket', (req, res) => {
     //we are atempting to add ticket information
     Tickets.createticket(databaseData, req, function(err, data) {
         //if we got an error informs the client and set the proper response code
         if (err) {
             res.status(400);
             res.end("error:" + err);
         }
         //if no error let's set proper response code and have a party
         res.status(201);
         res.end("success");
     });
 })

 //use postman
 server.put('/user/updatecomment', (req, res) => {
     //we are atempting to update comment information
     Details.updatecomment(databaseData, req, function(err, data) {

         //if we got an error informs the client and set the proper response code
         if (err) {
             res.status(400);
             res.end("error:" + err);
         }
         //if no error let's set proper response code and have a party
         res.status(201);
         res.end("success");
     });
 })

 //use postman
 server.put('/user/updateticket', (req, res) => {
     //we are atempting update ticket information
     Tickets.updateticket(databaseData, req, function(err, data) {
         //if we got an error informs the client and set the proper response code
         if (err) {
             res.status(400);
             res.end("error:" + err);
         }
         //if no error let's set proper response code and have a party
         res.status(201);
         res.end("success");
     });
 })

 //use postman
 server.del('/user/deletecomment', (req, res) => {
     //we are atempting to delete comment information
     Details.deletecomment(databaseData, req, function(err, data) {
         //if we got an error informs the client and set the proper response code
         if (err) {
             res.status(400);
             res.end("error:" + err);
         }
         //if no error let's set proper response code and have a party
         res.status(201);
         res.end("success");
     });
 })

 //use postman
 server.del('/user/deleteticket', (req, res) => {
     //we are atempting to delete ticket information
     Tickets.deleteticket(databaseData, req, function(err, data) {
         //if we got an error informs the client and set the proper response code
         if (err) {
             res.status(400);
             res.end("error:" + err);
         }
         //if no error let's set proper response code and have a party
         res.status(201);
         res.end("success");
     });
 })

 //use postman
 server.post('/user/retrievecomment', (req, res) => {
     //we are atempting to retrieve comment information
     Details.retrievecomment(databaseData, req, function(err, data) {
         //if we got an error informs the client and set the proper response code
         if (err) {
             res.status(400);
             res.end("error:" + err);
         }
         //if no error let's set proper response code and have a party
         res.status(201);
         res.end(data);
     });
 })

 //use postman
 server.post('/user/retrieveticket', (req, res) => {
     //we are atempting to retrieve ticket information
     Tickets.retrieveticket(databaseData, req, function(err, data) {
         //if we got an error informs the client and set the proper response code
         if (err) {
             res.status(400);
             res.end("error:" + err);
         }
         //if no error let's set proper response code and have a party
         res.status(201);
         res.end(data);
     });
 })

 server.post('/user/retrievedatabase', (req, res) => {
     //we are atempting to retrieve Users
     user.retrieveusers(databaseData, req, function(err, data) {
         //if we got an error informs the client and set the proper response code
         if (err) {
             res.status(400);
             res.end("error:" + err);
         }
         //if no error let's set proper response code and have a party
         res.status(201);
         res.end(data);
     });
 })



 //this route will allow to create tables in the database
 //it should be a confidential method and can be performed only by an admin
 server.get('/createTables', (req, res) => {

     db.createTables(databaseData, function(err, state) {
         if (err) {
             res.status(400);
             res.end("an error has occured:" + err);
             return;
         }
         res.status(200);
         res.end("tables were created successfully");
     });
 })

 //start the server
 server.listen(port, err => {
     if (err) {
         console.error(err)
     } else {
         console.log(`Server is running on port ${port}`)
     }
 })