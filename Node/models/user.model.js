

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  //id from mongo 
  email: { type: String, required: true, max: 100 },
  name: { type: String, required: true, max: 100 },
  reviewsId: { type: [Schema.Types.ObjectId] },
  isAdmin: { type: Boolean, required: true },
  password: { type: String, required: true, max: 100 },
  // verified: { type: Boolean },
  isActive: { type: Boolean },

});


// Export the model
module.exports = mongoose.model('User', userSchema);