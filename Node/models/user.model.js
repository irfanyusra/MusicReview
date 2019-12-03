

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user_schema = new Schema({
  //id from mongo 
  email: { type: String, unique: true, max: 100 },
  name: { type: String,max: 100 },
  hashPassword: { type: String },
  isAdmin: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },

});


// Export the model
module.exports = mongoose.model('User', user_schema);