const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  realname : {
    type : String,
    required: [true, 'You need enter realname!']
  },
  nickname : {
    type : String,
    required: [true, 'You need enter nickname!']
    //unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'You need enter email!'],
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  img_url : {
    type: String,
    required : [true, 'You need enter image url!']
  },
  password: {
    type: String,
    required: [true, 'You need enter password!']
  },

  // Не объязательные поля
  role : {
    type: String,
    default: 'User',
    enum: ['User', 'Admin'],
    required : true
  },
  rating : {
    type: Number,
    default: 0,
    min: 0,
    required : true
  },
  bookmarks: {
    type: Array,
    default: [],
    required : true
  },
  register_date: {
    type: Date,
    default: Date.now,
    required: true
  },
});

module.exports = mongoose.model('User', userSchema);
