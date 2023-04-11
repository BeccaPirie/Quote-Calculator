import User from '../models/User.js';
import Quotes from '../models/Quotes.js';
import { calculateQuote } from '../services/calculation.js';

const getUsersQuotes = async(req, res) => {
    try {
        console.log("fetching")
       const user = await User.findById(req.params.id)
       if(user._id.toString() !== req.user._id.toString()) return res.status(404).json("Not authorised")

       const quotes = await Quotes.find({userId:user._id})
       res.json(quotes)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getQuote = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(user._id.toString() !== req.user._id.toString()) return res.status(404).json("Not authorised")

        const quote = await Quotes.findOne({
            _id: req.params.quoteId,
            userId: user._id
        })
        res.json(quote)
    } catch (err) {
        res.status(500).json(err)
    }
}

const calcQuote = async(req, res) => {
    try {
        // TODO server validation
        // if(!req.body.fudgeFactor) {
        //     const user = await User.findById(req.params.id)
        //     if(!user.isAdmin) {
        //         return res.status(404).json("Don't have necessary permissions")
        //     }
        // }
        const total = await calculateQuote(req.body)
        res.json(total)
    } catch (err) {
        res.status(500).json(err)
    }
}

const addQuote = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(user._id.toString() !== req.user._id.toString()) return res.status(404).json("Not authorised")
        
        const newQuote = new Quotes({
            ...req.body
        })
        await newQuote.save()

        // TODO, if quote added has mainTaskId, add quote to total of main tasks
        // if main task, add to total

        res.json("Quote added")
    } catch (err) {
        res.status(500).json(err)
    }
}

const updateQuote = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(user._id.toString() !== req.user._id.toString()) return res.status(404).json("Not authorised")

        await Quotes.findByIdAndUpdate(req.params.quoteId, {$set: req.body})

        // TODO recalculate total quote

        res.json("Quote updated")
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteQuote = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(user._id.toString() !== req.user._id.toString()) return res.status(404).json("Not authorised")

        await Quotes.findOneAndDelete({
            _id: req.params.quoteId,
            userId: user._id
        })
        res.json("Quote deleted")
    } catch (err) {
        res.status(500).json(err)
    }
}

const combineQuotes = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(user._id.toString() !== req.user._id.toString()) return res.status(404).json("Not authorised")
        
        const quotes = await quotes.find({
            '_id': {
                $in: req.body
            }
        })

        // TODO COMPLETE

        res.json("Quotes combined")
    } catch (err) {
        console.error(err.response.data)
    }
}

export default {
    getUsersQuotes, getQuote, calcQuote, addQuote, updateQuote, deleteQuote, combineQuotes
}