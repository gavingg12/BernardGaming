const mongo = require('mongoose');

const DataSchema = new mongo.Schema({
  sender: mongo.SchemaTypes.String,
  senderID: {
    type: mongo.SchemaTypes.String,
    required: true,
  },
  linkRequested: {
    type: mongo.SchemaTypes.String,
    required: true,
  },
});

module.exports = mongo.model('BlacklistedLinks', DataSchema);