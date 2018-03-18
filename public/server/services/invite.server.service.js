module.exports = function (app) {
    "use strict";

    var mysql = require('mysql');
	var reachmail = require('reachmailapi');
    console.log("Inside server service");
    app.post('/api/user', createUser);
    app.get('/api/invitees', getInviteeList);
    app.put('/api/user/accept', markUserAcceptance);

    var dbConfig = {

        //mysql://b928185529d66a:fb159e88@us-cdbr-iron-east-05.cleardb.net/heroku_e2a6ca627db81ee?reconnect=true
        host: "us-cdbr-iron-east-05.cleardb.net",
        user: "b928185529d66a",
        password: "fb159e88",
        database: "heroku_e2a6ca627db81ee"
    };

	var con = mysql.createConnection(dbConfig);

    con.connect(function(err) {
        if (err) throw err;
        console.log("invite service -server db Connected!");
    });

    function createUser (req, res) {
        console.log("Inside server service");

        var user = req.body;
        con.query('INSERT INTO user (name, email, role, invitedBy) VALUES (?, ?, ?, ?)', [user.name, user.email, 'invitee', null], function(err, result) {
                if (err) throw err;
                con.query('SELECT * FROM user', function(err, results) {
                    if (err) throw err;
                    console.log(results[0].id);
                    console.log(results[0].name);
                    console.log(results[0].email);
                    console.log(results[0].role);
                    console.log(results[0].invitedBy)
                })
            });
		//inialize the wrapper to the variable api using a token generated from the User Interface at https://go.reachmail.net
		var api = new reachmail({token: 'J2Nk3swGupRcfzb2mVPhJOMlKTT5bxpTUMULWxP30E19HM7GgrEu6C6hIASfwGQ2'});

		//The following builds the content of the message
		var body={
			FromAddress: 'lakshmisha.s@husky.neu.edu',
			Recipients: [
			{
				Address: user.email
			}
			],
			Headers: { 
				Subject: 'Invitation to MLL App' ,
				From: 'David Herlihy <d.herlihy@northeastern.edu>',
				'X-Company': 'Northeastern University',
				'X-Location': 'Boston'
			}, 
			BodyText: "to be changed",
			BodyHtml: "<p>" + user.messageBody + "</p>",
			Tracking: true
		};
		//JSON encode the message body for transmission
		var jsonBody = JSON.stringify(body);
        var accountId = "79dca93b-4ef4-42c5-bcb7-a5a20100a3a1";
		/* 
		The function below retreieves the account GUID. Only when succefful will the 
		function proceed to them schedule the message for delivery.
		Information is printed to screen through the use of console.log(...)
		*/
		/*api.get('/administration/users/current', function (http_code, response) {
			if (http_code===200) {
				console.log(response);
				console.log("AccID: "+ response.AccountId);
				accountId = response.AccountId; //extracts account GUID from response obj
				console.log("Success!  Account GUID: " + AccountId); //prints out the Account GUID
				//Next Function sends the message

			} else {
				console.log("Oops, there was an error when trying to get the account GUID. Status Code: " + http_code);
				console.log("Details: " + response);
			}
		});*/
        api.post ("/easysmtp/" + accountId, jsonBody, function (http_code, response) {
            if (http_code===200) {
                console.log("successful connection to EasySMTP API");
                console.log(response);
            }else {
                console.log("Oops, looks like an error on send. Status Code: " + http_code);
                console.log("Details: " + response);
            }
        });
        console.log("------------------");
    }

    function getInviteeList(req, res) {
        console.log("Inside get invitee list");
        // con.connect(function(err) {
        //    if (err) throw err;


            con.query('SELECT * FROM user', function(err, results) {
                if (err) throw err;

                console.log(results[0]);

                res.send(results);
            });
        // });
    }

    function markUserAcceptance(req, res) {
        var user = req.body;
        console.log(user);
        console.log(user.name);
        console.log(user.email);
        con.query('UPDATE user\n' +
            'SET role = \'musician\'' +
            'WHERE name = ? and email = ?;', [user.name, user.email], function(err, result) {
            if (err) throw err;
            res.send(result);
        });
    }
    console.log("loaded : invite.service.server");
};