const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'You need enter author!']
  },
  news_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'News',
    required: [true, 'You need enter news!']
  },
  text: {
    type: String,
    minLength: 10,
    required: [true, 'You need enter text!']
  },

  // Не объязательные поля
  rating: {
    type: Number,
    default: 0,
    min: 0,
    required: true
  }
},
{ timestamps: {
    createdAt: 'create_date',
    updatedAt: 'update_date'
  }
});
const Comment = mongoose.model('Comment', commentSchema);

function createComment(authorId, newsId, text, rating) {
  return new Comment({
    _id: new mongoose.Types.ObjectId(),
    author_id: authorId,
    news_id: newsId,
    text: text,
    rating: rating
  })
}
module.exports = [Comment, createComment];
