import mongoose from "mongoose";

const PhysicalResourceSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Physical Resource"
    },

    name: {
        type: String,
        required: true
    },

    costType: {
        type: String,
        enum: ['One-off Payment', 'Weekly Payments', 'Monthly Payments'],
        required: true
    },
    
    cost: {
        type: Number,
        required: true
    }
})

export default PhysicalResourceSchema