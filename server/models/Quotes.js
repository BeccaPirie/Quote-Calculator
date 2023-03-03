const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    quote: {
        type: Number,
        required: true
    }

    // physical resources
    // human resources
})

export default mongoose.model('Quote', QuoteSchema);