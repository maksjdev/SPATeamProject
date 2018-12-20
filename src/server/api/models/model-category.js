const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String,
    minLength: 4,
    required: [true, 'You need enter name!']
  },
  news_amount: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  },
  disabled: {
    type: Boolean,
    default: true,
    required: true
  }
});
const Category = mongoose.model('Category', categorySchema);

function createCategory(name, disable) {
  return new Category({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    disable: disable
  })
}
module.exports = [Category, createCategory];
