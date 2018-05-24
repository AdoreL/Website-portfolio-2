var db = require('./database');
var auth = require('./authentication');

//this function is responsible for adding a new user
exports.add = function(conData, req, callback) {
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
            password: req.body['password'],
            nationality: req.body['nationality'],
            email: req.body['email'],
            gender: req.body['gender']
        };

        //perform the query
        data.query('INSERT INTO Users SET ?', user, function(err, result) {
            //return control to the calling module
            callback(err, user);
        });
    });
};

exports.login = function(conData, req, callback) {

    //first connect to DB
    db.connect(conData, function(err, data) {

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }

        auth.loginUser(conData, req, function(err, result) {

            if (err) {
                callback(err);
                return;
            }

            var data;

            if (result.login === "success") {
                data = { value: 1, message: "login success" };
            } else {
                data = { value: 0, message: "username or password is incorrect" };

            }
            callback(null, data);
        });
    });
};

exports.retrieveusers = function(conData, req, callback) {
    //first connect to DB
    db.connect(conData, function(err, data) {

        //when done check for any error
        if (err) {
            callback(err);
            return;
        }

        //if no error prepare our user object with the values sent by the client

        //perform the query
        console.log("Admin Connected!");
        var sql = "Select * FROM Users ";


        data.query(sql, function(err, result) {

            let data = JSON.stringify(result);

            callback(err, data);
        });
    });
};