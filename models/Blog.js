const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String
});

BlogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Blog', BlogSchema);