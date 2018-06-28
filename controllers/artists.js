var Artists = require('../models/artists');

module.exports.all = function(req, res) {
  Artists.all(function(err, docs) {
    if(err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (Object.keys(docs).length == 0) {
      return res.send('DB is empty!');
    };
    res.send(docs);
  })
}

module.exports.findByID = function(req, res) {
  Artists.findByID(req.params.id, function(err, doc) {
    if(err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })
}

module.exports.add = function(req, res) {
  var artist = {
    name: req.body.name
  }
  Artists.add(artist, function(err, result) {
    if(err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(artist);

  })
}

module.exports.update = function(req, res) {
  Artists.update(
    req.params.id,
    {$set: {name: req.body.name}},
    function(err, result) {
      if(err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    })
}

module.exports.delete = function(req, res) {
  Artists.delete(req.params.id, function(err, result) {
      if(err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    })
}
