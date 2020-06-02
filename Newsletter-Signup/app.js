// jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res){
  var first = req.body.first;
  var last = req.body.last;
  var email = req.body.email;
  console.log(first, last, email);

  var data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: first,
          LNAME: last,
        }
      }
    ]
  };

  var jsonDATA = JSON.stringify(data);

  var options = {
    url: 'https://us4.api.mailchimp.com/3.0/lists/406f6e5d49',
    method: 'POST',
    headers: {
      'Authorization': 'removedForGit'
    },
    body: jsonDATA,
  };

  request(options, function(error, response, body){
      if (error){
        res.sendFile(__dirname + "/failure.html");
      } else {
        if (response.statusCode === 200){
          res.sendFile(__dirname + "/success.html");
        } else {
          res.sendFile(__dirname + "/failure.html");
        }
      }
  });
});

app.post('/failure', function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
