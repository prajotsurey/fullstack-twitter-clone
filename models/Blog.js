const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 5
  },
  content: {
    type: String,
    required: true,
    minLength: 5
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

BlogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Blog', BlogSchema);