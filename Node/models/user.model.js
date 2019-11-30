

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  //id from mongo 
  email: { type: String, required: true, max: 100 },
  name: { type: String, required: true, max: 100 },
  hashPassword: { type: String, required: true },
  isAdmin: { type: Boolean, default:false },
  // password: { type: String, required: true, max: 100 },

  verified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },

});


// Export the model
module.exports = mongoose.model('User', userSchema);