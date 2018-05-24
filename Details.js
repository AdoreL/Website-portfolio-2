var db = require('./database');

//this function is responsible for adding a new comment
exports.createcomment = function(conData, req, callback) {
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
            comment: req.body['comment']
        };

        console.log("Create Connected!");
        //perform the query
        data.query('INSERT INTO Details SET ?', user, function(err, result) {
            //return control to the calling module
            callback(err, user);
        });
    });
};

//this function is responsible for updating comment
exports.updatecomment = function(conData, req, callback) {
    //first connect to DB
    db.connect(conData, function(err, data) {

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }

        console.log("Update Connected!");
        var sql = "UPDATE Details SET comment = '" + req.body['comment'] + "' WHERE Details.username = '" + req.body['username'] + "'";


        data.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Number of records updated: " + result.affectedRows);
        });
    });
};

//this function is responsible for deleting comment
exports.deletecomment = function(conData, req, callback) {
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
        var sql = " DELETE FROM Details WHERE Details.username = '" + req.body['username'] + "'";


        data.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
        });
    });
};

//this function is responsible for retrieving comment
exports.retrievecomment = function(conData, req, callback) {
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
        var sql = "Select * FROM Details WHERE Details.username = '" + req.body['username'] + "'";


        data.query(sql, function(err, result) {

            let data = JSON.stringify(result);

            callback(err, data);
        });
    });
};