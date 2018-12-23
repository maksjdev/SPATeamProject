const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    //required: [true, 'You need enter author!']
  },
  news:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'News'
  },
  text: {
    type: String,
    minLength: 10,
    required: [true, 'You need enter text!']
  },
  create_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    required: true
  }
},
{ timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const Comment = mongoose.model('Comment', commentSchema);

function createComment(authorId, newsId, text, rating) {
  return new Comment({
    _id: new mongoose.Types.ObjectId(),
    authorId: authorId,
    newsId: newsId,
    text: text,
    rating: rating
  })
}
module.exports = [Comment, createComment];
