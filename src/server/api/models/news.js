const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  title: String,
  text: String
});

module.exports = mongoose.model('News', newsSchema);
