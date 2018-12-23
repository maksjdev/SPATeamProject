const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'You need enter author!']
  },
  title: {
    type: String,
    minLength: 10,
    required: [true, 'You need enter title!']
  },
  text: {
    type: String,
    minLength: 100,
    required: [true, 'You need enter text!']
  },
  img_url: {
    type: String,
    required: [true, 'You need enter main image link!']
  },

  // Не объязательные поля
  categories: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }],
    default: [],
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  comments_number: {
    type: Number,
    default: 0,
    min: 0,
    required: true
  },
  comments: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    default: [],
    required: true
  }
},
  { timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const News = mongoose.model('News', newsSchema);

function createNews(authorId, title, text, img_url, categories, rating) {
  return new News({
    _id: new mongoose.Types.ObjectId(),
    author:   authorId,
    title:    title,
    text:     text,
    img_url:  img_url,
    categories: categories,
    rating:     rating
  })
}
module.exports = [News, createNews];
