const mongoose = require('mongoose');

// connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} );

// Define the MongoDB database model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });
  
const User = mongoose.model('User', userSchema);

module.exports = User;