
const mongoose = require('mongoose');


const newsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title : {
    type : String,
    required: true
  },
  image_url : {
    type : String,
    required: true
  },
  text : {
    type: String,
    required : true
  },
  date:{
    type : Date,
    default : Date.now(),
    required: true
  },
  author : {
    type: String,
    ref : 'user',
    required : true
  },

  // Ne  обязательные поля
  categories : {
    type : Array,
    default: [],
    ref:'categories',
    required : true
  },
  rating : {
    type: Number,
    default: 0,
    min: 0,
    required : true
  },
  comments_number : {
    type: Number,
    default: 0,
    min: 0,
    required : true
  },
  comments: {
    type: String,
    ref : 'comments',
    required: true
  }
});

module.exports = mongoose.model('News', newsSchema);
