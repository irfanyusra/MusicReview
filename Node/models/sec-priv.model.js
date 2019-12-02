const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let security_privacy_schema = new Schema({
    security: { type: String, required: true },
    privacy: { type: String, required: true },
    submittedOn: { type: Date }

});

// Export the model
module.exports = mongoose.model('Security_Privacy', security_privacy_schema); 