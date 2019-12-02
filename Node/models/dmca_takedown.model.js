const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Dmca_Takedown = new Schema({
    dmca: { type: String, required: true },
    takedown: { type: String, required: true },
    submittedOn: { type: Date }

})

// Export the model
module.exports = mongoose.model('Dmca_Takedown', Dmca_Takedown); 