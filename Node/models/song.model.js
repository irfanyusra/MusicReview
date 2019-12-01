const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let songSchema = new Schema({
  //id from mongo
  title: { type: String, required: true, max: 30 },
  artist: { type: String, required: true, max: 30 },
  album: { type: String, max: 30, default: "Unkown" },
  year: { type: String, max: 4, default: "2019" },
  genre: { type: String, max: 100, default: "Unkown" },
  comment: { type: String, max: 30, default: 'Unknown' },
  hidden: { type: Boolean, default: false },
  copyRightViolation: { type: Boolean, default: false },
  noOfReviews: { type: Number, default: 0 },
  avgOfRatings: { type: Number, default: 0 },

});


// Export the model
module.exports = mongoose.model('Song', songSchema);