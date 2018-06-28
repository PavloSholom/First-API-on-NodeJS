var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var db = require('./db');
var artistsController = require('./controllers/artists');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/',function(req, res) {
  res.send('Hello API!');
});

app.get('/artists', artistsController.all);
app.get('/artists/:id', artistsController.findByID);
app.post('/artists', artistsController.add);
app.put('/artists/:id', artistsController.update);
app.delete('/artists/:id', artistsController.delete);

db.connect('mongodb://localhost:27017/myapi', function(err) {
  if(err) {
    return console.log(err);
  }
  app.listen(3333, function() {
    console.log('Server started!');
  })
})
