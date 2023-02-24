const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const User = require('../models/UserSchema')
dotenv.config()

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {

        // check all inputs are valid

        // check if user exists

        // create password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // create user
        const createUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })

        // save user
        const user = await createUser.save()
        const token = generateToken(user._id)
        const refreshToken = generateRefreshToken(user._id)
        await user.updateOne({
            $set: {
                token: token,
                refreshToken: refreshToken
            }
        })

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: token,
            refreshToken: refreshToken
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        // find user
        const loginUser = await User.findOne({email: req.body.email})
        if(!loginUser) return res.status(404).json("User not found")

        // check password
        const isValid = await bcrypt.compare(req.body.password, loginUser.password)
        if(!isValid) return res.status(400).json("Incorrect password")

        // generate new tokens
        const token = await generateToken(loginUser._id)
        const refreshToken = await generateRefreshToken(loginUser._id)

        await loginUser.updateOne({
            $set: {
                token: token,
                refreshToken: refreshToken
            }
        })

        res.json({
            _id: loginUser._id,
            username: loginUser.username,
            email: loginUser.email,
            token: token,
            refreshToken: refreshToken
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('refresh-token', async(req, res) => {
    // get user
    const user = await User.findById(req.body.id)
    // get token
    const refreshToken = req.body.token
    
    // send error if token doesn't exist or is not valid
    if (!refreshToken) res.status(401).json("Not authenticated")
    if(refreshToken !== user.refreshToken) return res.status(403).json("Token not valid")

    // verify and create new tokens
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async(err, decoded) => {
        if(err) {
            console.error(err)
        }
        const newAccessToken = await generateToken(decoded.id)
        const newRefreshToken = await generateRefreshToken(decoded.id)

        await User.findByIdAndUpdate(decoded.id, {
            $set: {
                token: newAccessToken,
                refreshToken: newRefreshToken
            }
        })

        res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
        })
    })
})

// generate token
const generateToken = async(id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '15m'
    })
}

// generate refresh token
const generateRefreshToken = async(id) => {
    return jwt.sign({id}, process.env.JWT_REFRESH_SECRET)
}

export default router;