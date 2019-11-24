

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reviewSchema = new Schema({
  //id from mongo
  subject: { type: String, required: true, max: 100 },
  comment: { type: String, required: true, max: 100 },
  songId: { type: Schema.Types.ObjectId, ref: 'Song', required: true }, 
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  rating: { type: Number, min: 1, max: 5 },
  submittedOn: { type: Date, required: true}


});


// Export the model
module.exports = mongoose.model('Review', reviewSchema);