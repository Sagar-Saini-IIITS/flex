const mongoose = require('mongoose');

const { Schema } = mongoose;
const EnrollSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'  
    },
    paymentID: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        default: "67"
    },
    month: {
        type: String
    },
    year: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('enroll', EnrollSchema); 