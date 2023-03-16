import PhysicalResourceSchema from './PhysicalResource';
import HumanResourceSchema from './HumanResource'

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
    },

    physicalResources: {
        type: [PhysicalResourceSchema],
    },
    
    humanResources: {
        type: [HumanResourceSchema],
        min: 1
    },

    mainTaskId: {
        type: String
    }
})

export default mongoose.model('Quote', QuoteSchema);