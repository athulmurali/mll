module.exports = function (app) {
    "use strict";
    console.log("inside :user.invite.service ");
    var mysql = require("mysql");
    var passport = require('passport');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var multer = require('multer');


    app.use(session({
        secret: 'this is a secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    // passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/logout', logout);
    app.post('/api/user', createUser);
    app.post('/api/user/trackUpload',trackUpload );


    var dbConfig = {

        //mysql://b928185529d66a:fb159e88@us-cdbr-iron-east-05.cleardb.net/heroku_e2a6ca627db81ee?reconnect=true
        host: "us-cdbr-iron-east-05.cleardb.net",
        user: "b928185529d66a",
        password: "fb159e88",
        database: "heroku_e2a6ca627db81ee"
    };

    var con = mysql.createConnection(dbConfig);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {

    }

    function login(req, res) {
        var user = req.user;
        console.log("login-function accessed - server")
        res.json(user);
    }

    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        user.password =  bcrypt.hashSync(user.password);

        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected! - for user creation");
            con.query('INSERT INTO user (name, email, role, invitedBy) VALUES (?, ?, ?, ?)', [user.id, user.name, user.email, user.role, null], function(err, result) {
                if (err) throw err;
                con.query('SELECT * FROM user', function(err, results) {
                    if (err) throw err;
                    console.log(results[0].id)
                    console.log(results[0].name)
                    console.log(results[0].email)
                    console.log(results[0].role)
                    console.log(results[0].invitedBy)
                })
            });
        });
    }

    /**
     * trackUpload is function for storing the file uploaded by the user in the disk storage
     * test 1: check if status code 200 is returned for endpoint (done)
     * test 2: check if the file is received (done)
     * test 3: check if the file is saved in the given location(done)
     * test 4 : check if the file is being saved with the new name for database
     * test 5: check  if the fileName  is mapped in the user's database (later in monogo)
     * @param req
     * @param res
     */
    function trackUpload(req,res){

        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './fileStorage/tracks/')
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + ".mp3")
            }
        })

        var upload = multer({ storage: storage }).single('track');

        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading
                console.log(err);
                return
            }

            console.log("multer : file upload success ");
            // Everything went fine
        })
        console.log("inside : track upload ");
        res.sendStatus(200);
    }

};