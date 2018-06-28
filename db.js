var MongoClient = require('mongodb').MongoClient;

var state = {
  db: null
}

module.exports.connect = function(url,done) {
  if(state.db) {
    return done();
  }

  MongoClient.connect(url,function(err,client) {
    if(err) {
      return done(err);
    }
    state.db = client.db(client.s.options.dbName);
    done();
  });
}

module.exports.get = function() {
  return state.db;
}
