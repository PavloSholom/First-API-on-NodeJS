var express = require('express'),
    app = express();

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

app.listen(3333, function() {
  console.log('Server started!');
})
