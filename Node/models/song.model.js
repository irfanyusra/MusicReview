

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let songSchema = new Schema({
  //id from mongo
  title: { type: String, required: true, max: 100 },
  artist: { type: String, required: true, max: 100 },
  album: { type: String, max: 30 },
  year: { type: Number, min: 0, max: 2019 },
  genre: { type: String },
  hidden: { type: Boolean, default:false },
  copyRightViolation: { type: Boolean, default:false },
  reviewsId: { type: [Schema.Types.ObjectId], ref: 'Review' },

});


// Export the model
module.exports = mongoose.model('Song', songSchema);