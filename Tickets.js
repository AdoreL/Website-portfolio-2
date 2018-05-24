var db = require('./database');

//this function is responsible for adding a new ticket
exports.createticket = function(conData, req, callback) {
    //first connect to DB
    db.connect(conData, function(err, data) {

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }

        //if no error prepare our user object with the values sent by the client
        var user = {
            username: req.body['username'],
            ticket: req.body['ticket']
        };

        console.log("Update Connected!");
        //perform the query
        data.query('INSERT INTO Tickets SET ?', user, function(err, result) {
            //return control to the calling module
            callback(err, user);
        });
    });
};

//this function is responsible for updating ticket
exports.updateticket = function(conData, req, callback) {
    //first connect to DB
    db.connect(conData, function(err, data) {

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }

        console.log("Update Connected!");
        var sql = "UPDATE Tickets SET ticket = '" + req.body['ticket'] + "' WHERE Tickets.username = '" + req.body['username'] + "'";


        data.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Number of records updates: " + result.affectedRows);
        });
    });
};

//this function is responsible for deleting ticket
exports.deleteticket = function(conData, req, callback) {
    //first connect to DB
    db.connect(conData, function(err, data) {

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }

        //if no error prepare our user object with the values sent by the client
        //perform the query
        console.log("Delete Connected!");
        var sql = " DELETE FROM Tickets WHERE Tickets.username = '" + req.body['username'] + "'";


        data.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
        });
    });
};

//this function is responsible for retrieving ticket
exports.retrieveticket = function(conData, req, callback) {
    //first connect to DB
    db.connect(conData, function(err, data) {

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }

        //if no error prepare our user object with the values sent by the client

        //perform the query
        console.log("Retrieve Connected!");
        var sql = "Select * FROM Tickets WHERE Tickets.username = '" + req.body['username'] + "'";


        data.query(sql, function(err, result) {

            let data = JSON.stringify(result);

            callback(err, data);
        });
    });
};