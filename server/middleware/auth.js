import jwt from 'jsonwebtoken'
import User from "../models/User.js";
import config from '../config.js'

// verify jwt
const protect = async (req, res, next) => {
    let token
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            // get token
            token = req.headers.authorization.split(' ')[1]
            
            // verify token
            jwt.verify(token, config.jwtSecret, async(err, decoded) => {
                if(err) {
                    console.error(err)
                }
                // get user from token
                req.user = await User.findById(decoded.id).select('-password')
                next()
            })
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

export default protect