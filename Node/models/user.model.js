

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user_schema = new Schema({
  //id from mongo 
  email: { type: String, unique: true, required: true, max: 100 },
  name: { type: String, required: true, max: 100 },
  hashPassword: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },

});


// Export the model
module.exports = mongoose.model('User', user_schema);