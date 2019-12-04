
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const token_schema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
//expired in 12 hours 
});


// Export the model
module.exports = mongoose.model('Token', token_schema);