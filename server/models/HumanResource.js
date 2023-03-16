import mongoose from "mongoose";

const HumanResourceSchema = new mongoose.Schema({
    paygrade: {
        type: String,
        enum: ['Junior', 'Standard', 'Senior'],
        required:true
    },

    workers: {
        type: Number,
        required: true,
        min: 1
    },

    time: {
        type: Number,
        required: true,
        min: 1,
    }
})

export default HumanResourceSchema