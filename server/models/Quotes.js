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
})

export default mongoose.model('Quote', QuoteSchema);