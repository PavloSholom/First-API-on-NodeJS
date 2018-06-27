var express = require('express'),
    app = express();

var bodyParser = require('body-parser');
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
  res.send(artists);
});

app.get('/artists/:id',function(req, res) {
  var artistId = req.params.id;
  var artist = artists.find(function(artist) {
    return artist.id === +artistId
  });
  res.send(artist);
});

app.post('/artists', function(req, res) {
  console.log(req.body);
  var artist = {
    id: Date.now(),
    name: req.body.name
  };
  artists.push(artist);
  res.send(artist);
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


app.listen(3333, function() {
  console.log('Server started!');
})
