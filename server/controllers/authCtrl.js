import config from '../config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import EmailValidator from 'email-validator'

const signUp = async(req, res) => {
    try {
        // check password is valid
        if(req.body.password.length < 6) {
            return res.status(400).json("Password must contain at least 6 characters")
        }
        if(req.body.password !== req.body.confirmPassword) {
            return res.status(400).json("Passwords don't match")
        }

        // check if email is valid
        if(!EmailValidator.validate(req.body.email)) {
            return res.status(400).json("Not a valid email address")
        }

        // check if user exists
        const checkEmail = await User.findOne({email: req.body.email})
        if(checkEmail) return res.status(409).json("Account already exists!")

        // create password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // create user
        const createUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin || false
        })

        // save user
        const user = await createUser.save()

        // generate jwt token and update user
        const token = await generateToken(user._id)

        await user.updateOne({
            $set: {
                token: token
            }
        })

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: token
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

const login = async(req, res) => {
    try {
        const loginUser = await User.findOne({email: req.body.email})
        const isValid = await bcrypt.compare(req.body.password, loginUser.password)
        if(!loginUser || !isValid) return res.status(404).json("Username or password is incorrect")

        // generate new token
        const token = await generateToken(loginUser._id)

        await loginUser.updateOne({
            $set: {
                token: token
            }
        })

        res.json({
            _id: loginUser._id,
            username: loginUser.username,
            email: loginUser.email,
            token: token,
            isAdmin: loginUser.isAdmin
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

// generate token
const generateToken = async(id) => {
    return jwt.sign({id}, config.jwtSecret)
}

export default {
    signUp, login
}