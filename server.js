var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var app = express();
var db;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var artists = [
  {
    id: 1,
    name: 'Metallica'
  },
  {
    id: 2,
    name: 'Iron Maiden'
  },
  {
    id: 3,
    name: 'Deep Purple'
  }
];

app.get('/',function(req, res) {
  res.send('Hello API!');
});

app.get('/artists',function(req, res) {
  db.collection('artists').find().toArray(function(err, docs) {
    if(err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
});

app.get('/artists/:id',function(req, res) {
  db.collection('artists').findOne({_id: ObjectID(req.params.id)}, function(err, doc) {
    if(err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  });
});

app.post('/artists', function(req, res) {
  console.log(req.body);
  var artist = {
    name: req.body.name
  };
  db.collection('artists').insert(artist, function(err, result) {
    if(err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(artist);
  });
});

app.put('/artists/:id', function(req, res) {
  var artistId = req.params.id;
  var artist = artists.find(function(artist) {
    return artist.id === +artistId
  });
  artist.name = req.body.name;
  res.sendStatus(200);
});

app.delete('/artists/:id', function(req, res) {
  var artistId = req.params.id;
  artists = artists.filter(function(artist) {
    return artist.id !== +artistId
  });
  res.sendStatus(200);
});

MongoClient.connect('mongodb://localhost:27017/', function(err, database) {
  if(err) {
    return console.log(err);
  }
  db = database.db("myapi");
  app.listen(3333, function() {
    console.log('Server started!');
  })
})
