import User from '../models/User.js';
import bcrypt from 'bcrypt'
import EmailValidator from 'email-validator'

const getUser = async(req, res) => {

}

const updateUser = async(req, res) => {
    try {
        const currentUser = await User.findById(req.user._id)
        
        // if email is changed, check it is valid and that it's not already in use
        if(currentUser.email !== req.body.email) {
            if(!EmailValidator.validate(req.body.email)) return res.status(400).json("Not a valid email address")
            
            const checkEmail = await User.findOne({email: req.body.email})
            if(checkEmail) return res.status(409).json("Select a different email address")
        }

        // update user
        await User.findByIdAndUpdate(req.user._id, {
            $set: {
                username: req.body.username,
                email: req.body.email
            }
        })
        res.status(200).json("User updated successfully")
    } catch (err) {
        res.status(500).json(err)
    }
}

const updatePassword = async(req, res) => {
    try {
        // check if old password is correct
        const currentUser = await User.findById(req.user._id)
        const password = await bcrypt.compare(req.body.oldPassword, currentUser.password)
        if(!password) return res.status(400).json("Incorrect password")

        // check password is valid
        if(req.body.newPassword.length < 6) {
            return res.status(400).json("Password must contain at least 6 characters")
        }
        if(req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).json("Passwords don't match")
        }

        // create new password
        const bcryptPass = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(req.body.newPassword, bcryptPass)

        // update user account with new password
        await User.findByIdAndUpdate(req.user._id, {
            $set: {password: newPassword}
        })
        res.status(200).json(newPassword)
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id)
        res.status(200).json("User deleted")
    } catch (err) {
        res.status(500).json(err)
    }
}

export default {
    getUser, updateUser, updatePassword, deleteUser
}