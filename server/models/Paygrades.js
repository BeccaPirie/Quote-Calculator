import mongoose from "mongoose";

const PaygradeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },

    salary: {
        type: Number,
        required: true
    }
})

export default mongoose.model("Paygrades", PaygradeSchema)
