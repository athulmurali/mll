var express     = require('express');
var app         = express();
var http        = require('http');
var bodyParser  = require('body-parser');
var mysql       = require('mysql');
var db          = require('./dbConfig.js'); //added for centralized database config

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//route example
/*app.get("/hello", function (req, res) {
    res.send("/hello from server");
});*/

//instead of creating tons of routes, abstract using this line
app.use(express.static(__dirname + '/public'));

require("./public/server/app.js")(app);

app.post('/email', function(req, res) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('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');
    var musicianInvitationBody1 = "I would like to invite you to participate in an exciting new music project at Northeastern University, the first beta-test phase of the launch of NU’s Media Licensing Laboratory (ML-Lab).";
    var musicianInvitationBody2 = "I am asking you to join this effort, and upload your music onto our ML-LAB Platform so we can create a prototype music library solely for educational and research purposes. This will be a great way to introduce your music to NU students.";
    var musicianInvitationBody3 = "We are also anxious to get your feedback about your experience with the ML-LAB Platform, so I ask that you send any feedback and bug reports promptly through the feedback window so that we can use your input to improve the process.";
    var musicianInvitationBody4 = "Our long term goal is to establish a student-run music licensing program so students can place great independent music in movies, television shows, video games and commercials. However, we’re not even close to launching the Licensing Program, so for now, we’re just trying to gather some great music into our library for NU students to work with.";
    var musicianInvitationBody5 = "Before we actually launch the Music Licensing Program, we’ll ask you if you want to be included. Participation in the Music Licensing Program will be voluntary and non-exclusive and you will retain all rights in your music. If you do decide to participate in the Music Licensing Program, you will be free to withdraw at any time.";
    var musicianInvitationBody6 = "Please click on the link below to participate in the ML-Lab and upload your music into our Library. Please let me know if you have any comments or questions and don’t forget to give us your feedback about your experience with the Platform.";
    /*   const msg = {
           to: req.body.to,
           from: 'lakshmisha.s@husky.neu.edu',
           subject: 'Invite to MLL App',
           text: 'This apparently does not matter',
           html: '<p style="font-size: large"><p>Dear ' + req.body.firstname+ ',</p>' + '<br>' +
           '<p>'+ musicianInvitationBody1 +'</p><br>' +
           '<p>'+ musicianInvitationBody2 +'</p><br>' +
           '<p>'+ musicianInvitationBody3 +'</p><br>' +
           '<p>'+ musicianInvitationBody4 +'</p><br>' +
           '<p>'+ musicianInvitationBody5 +'</p><br>' +
           '<p>'+ musicianInvitationBody6 +'</p><br>' +
           '<p>Thanks, Admin</p>' + '</p>'
       };
       sgMail.send(msg);
   });*/

    /*var con = mysql.createConnection({
        host: "localhost",
        user: "sneha",
        password: "abcd1234",
        database: "mlldb"*/
    });

    var dbConfig = db.config;
    var connection;

    function handleDisconnect() {
        connection = mysql.createConnection(dbConfig);

        connection.connect(function(err) {
            if(err) {
                console.log('error when connecting to db:', err);
                setTimeout(handleDisconnect, 2000);
            }

            console.log("Connected to db successfully!");

            connection.query('CREATE TABLE IF NOT EXISTS user(id int auto_increment primary key, name varchar(255), password varchar(255), email varchar(255), role ENUM(\'invitee\', \'admin\', \'anr\', \'musician\'), invitedBy int, CONSTRAINT uc_user UNIQUE (id, email)) auto_increment=100', function(err, result) {
                if (err) throw err;
            });

            connection.on('error', function(err) {
                console.log('db error', err);
                if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                    handleDisconnect();                         // lost due to either server restart, or a
                } else {                                      // connnection idle timeout (the wait_timeout
                    throw err;                                  // server variable configures this)
                }
            });

        });

    }

    handleDisconnect();



var fs = require('fs');
console.log("server.js :reading instruments ....");
try {
    var data = fs.readFileSync('data_to_load/instruments/strings.txt', 'utf8');
    console.log(data);
} catch(e) {
    console.log('Error:', e.stack);
}

//app.listen(3000);
    app.listen(process.env.PORT || 3000, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });