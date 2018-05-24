//this function recieve the database access information and a callback function
//eventually the callback function will either be called with errors if any happened or
//be called and the connection object is passed to it with null for error
var mysql = require('mysql');

exports.connect = function(conData, callback) {

    var con = mysql.createConnection({
        host: conData.host,
        user: conData.user,
        password: conData.password,
        database: conData.database
    });
    con.connect(function(err) {
        if (err) callback(err);
        callback(null, con);
    })
};

//export a function to create database tables
//this function suppose to create all our tables for us, we will need to call it only one time
//that is when we are setting up our final system, also note that this function should only be accessed
//by the administrator of the website, so it is very credential, currently we do not have
//any protection over it
exports.createTables = function(conData, callback) {
    var con = mysql.createConnection({
        multipleStatements: true,
        host: conData.host,
        user: conData.user,
        password: conData.password,
        database: conData.database
    });

    //create the 3 databases
    var sql = "CREATE TABLE Users (ID INT NOT NULL AUTO_INCREMENT, username VARCHAR(32), password VARCHAR(16), nationality VARCHAR(32), email VARCHAR(32), gender VARCHAR(8), PRIMARY KEY (ID))";
    var sql2 = "CREATE TABLE Details (ID INT NOT NULL AUTO_INCREMENT, username VARCHAR(32), comment VARCHAR(8), PRIMARY KEY (ID))";
    var sql3 = "CREATE TABLE Tickets (ID INT NOT NULL AUTO_INCREMENT, username VARCHAR(32), ticket VARCHAR(8), PRIMARY KEY (ID))";

    con.query(sql, function(err, result) {
        console.log("finish query:" + result);
        callback(err, result);
    });
    con.query(sql2, function(err, result) {
        console.log("finish query:" + result);
        callback(err, result);
    });
    con.query(sql3, function(err, result) {
        console.log("finish query:" + result);
        callback(err, result);
    });
};