var port = process.env.PORT || 4080;
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/api', function (req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

app.post('/api', function (req, res) {
  res.send({
    "Output": "Hello World Post!"
  });
});

app.get('*', function (req, res) {
    res.send({
      "Output": "This route doesnt exist!"
    });
  });

app.listen(port);
module.exports = app;