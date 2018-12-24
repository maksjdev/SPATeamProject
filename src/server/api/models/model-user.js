const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  realname: {
    type: String,
    minLength: 6,
    required: [true, 'You need enter realname!']
  },
  nickname: {
    type: String,
    minLength: 6,
    required: [true, 'You need enter nickname!']
  },
  email: {
    type: String,
    unique: true,
    minLength: 8,
    required: [true, 'You need enter email!'],
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  img_url: {
    type: String,
    required: [true, 'You need enter img_url url!']
  },
  password: {
    type: String,
    minLength: 6,
    required: [true, 'You need enter password!']
  },

  // Не объязательные поля
  role: {
    type: String,
    default: 'User',
    enum: ['User', 'Admin'],
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    required: true
  },
  bookmarks: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'News'
    }],
    default: [],
    required: true
  }
},
  { timestamps: {
    createdAt: 'create_date',
    updatedAt: 'update_date'
  }
});
const User = mongoose.model('User', userSchema);

function createUser(imgUrl, realname, nickname, email, password) {
  return new User({
    _id: new mongoose.Types.ObjectId(),
    img_url:  imgUrl,
    realname: realname,
    nickname: nickname,
    email:    email,
    password: password,
  })
}
module.exports = [User, createUser];
