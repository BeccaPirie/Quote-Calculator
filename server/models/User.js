import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },

    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please add a valid email address'],
    },

    password: {
        type: String,
        required: true,
        min: 6
    },

    isAdmin: {
        type: Boolean,
        dafault: false
    }
})

export default mongoose.model('User', UserSchema);