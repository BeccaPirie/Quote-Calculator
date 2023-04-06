import User from '../models/User.js';
import Quotes from '../models/Quotes.js';
import { calculateQuote } from '../services/calculation.js';

const getUsersQuotes = async(req, res) => {
    try {
       const user = await User.findById(req.params.id) 
       const quotes = await Quotes.find({userId:user._id})
       res.json(quotes)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getQuote = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
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
        const total = calculateQuote(req.body, true)
        res.json({total:total})
    } catch (err) {
        res.status(500).json(err)
    }
}

const calcQuoteAdmin = async(req, res) => {
    try {
        // TODO server validation
        const total = calculateQuote(req.body, false)
        res.json({total:total})
    } catch (err) {
        res.status(500).json(err)
    }
}

const addQuote = async(req, res) => {
    try {
        const newQuote = new Quotes({
            ...req.body
        })
        await newQuote.save() 
    } catch (err) {
        res.status(500).json(err)
    }
}

const updateQuote = async(req, res) => {
    try {
        await Quotes.findByIdAndUpdate(req.params.quoteId, {$set: req.body})
        res.json("Quote updated")
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteQuote = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        await Quotes.findOneAndDelete({
            _id: req.params.quoteId,
            userId: user._id
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

export default {
    getUsersQuotes, getQuote, calcQuote, calcQuoteAdmin, addQuote, updateQuote, deleteQuote
}