const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LogSchema = new Schema({
    type: { type: String, enum: ['request', 'notice', 'dispute'], required: true },
    songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
    comment: { type: String, required: true },
    submittedOn: { type: Date }
});

// Export the model
module.exports = mongoose.model('Log', LogSchema);
