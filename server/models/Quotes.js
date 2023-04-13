import mongoose from 'mongoose';
import PhysicalResourceSchema from './PhysicalResource.js';
import HumanResourceSchema from './HumanResource.js';

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
    },

    total: {
        type: Number,
        default:0
    }
})

export default mongoose.model('Quote', QuoteSchema);