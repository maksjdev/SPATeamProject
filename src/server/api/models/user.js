const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name : {
    type : String,
    required: true
  },
  nickname : {
    type : String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  img_url : {
    type: String,
    required : true
  },
  password: {
    type: String,
    required: true
  },
  password2: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
