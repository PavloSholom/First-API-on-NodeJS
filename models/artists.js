var db = require('../db');
var ObjectID = require('mongodb').ObjectID;


module.exports.all = function(cb) {
  db.get().collection('artists').find().toArray(function (err, docs) {
    cb(err, docs);
  })
}

module.exports.findByID = function(id, cb) {
  db.get().collection('artists').findOne({_id: ObjectID(id) }, function(err, doc) {
    cb(err, doc);
  })
}

module.exports.add = function(artist, cb) {
  db.get().collection('artists').insert(artist, function(err, result) {
      cb(err, result);
  })
}

module.exports.update = function(id, newData, cb) {
  db.get().collection('artists').updateOne({_id: ObjectID(id)}, newData, function(err, result) {
      cb(err, result);
  })
}

module.exports.delete = function(id, cb) {
  db.get().collection('artists').remove( {_id: ObjectID(id)}, function(err, result) {
      cb(err, result);
    })
}
