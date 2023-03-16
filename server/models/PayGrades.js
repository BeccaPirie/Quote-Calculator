import mongoose from "mongoose";

const PayGradeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },

    salary: {
        type: Number,
        required: true
    }
})

export default mongoose.model("PayGrade", PayGradeSchema)