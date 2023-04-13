import User from '../models/User.js';
import Quotes from '../models/Quotes.js';
import { calculateQuote } from '../services/calculation.js';

// ***** GET ALL USERS QUOTES *****
const getUsersQuotes = async(req, res) => {
    try {
       const user = await User.findById(req.params.id)
       if(user._id.toString() !== req.user._id.toString()) return res.status(404).json("Not authorised")

       const quotes = await Quotes.find({userId:user._id})
       res.json(quotes)
    } catch (err) {
        res.status(500).json(err)
    }
}

// ***** GET SINGLE QUOTE *****
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

// ***** CALCULATE QUOTE *****
const calcQuote = async(req, res) => {
    try {
        // validation
        if(!req.body.fudgeFactor) {
            if(!req.params.id) return res.status(404).json("Don't have necessary permissions")
            const user = await User.findById(req.params.id)
            if(!user.isAdmin) return res.status(404).json("Don't have necessary permissions")
        }
        const total = await calculateQuote(req.body)
        res.json(total)
    } catch (err) {
        res.status(500).json(err)
    }
}

// ***** ADD QUOTE *****
const addQuote = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(user._id.toString() !== req.user._id.toString()) return res.status(404).json("Not authorised")
        
        // if main task, set quote total to overall total
        if(req.body.mainTaskId === '') {
            const newQuote = new Quotes({
                ...req.body,
                total: req.body.quote
            })
            await newQuote.save()
            res.json({quote: newQuote})
        }
        // if subtask, add the total of this quote to the overall total
        else {

            const newQuote = new Quotes(req.body)
            await newQuote.save()

            const mainQuote = await Quotes.findById(req.body.mainTaskId)

            await mainQuote.updateOne({
                $inc: {
                    total: req.body.quote
                }
            })

            res.json({quote: newQuote, total: (mainQuote.total + req.body.quote)})
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

// ***** UPDATE QUOTE *****
const updateQuote = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(user._id.toString() !== req.user._id.toString()) return res.status(404).json("Not authorised")
     
        // get quote
        const quote = await Quotes.findById(req.params.quoteId)
        // get subtasks
        const subtasks = await Quotes.find({mainTaskId: quote._id})

        // add up total cost of quote and all subtasks
        let total = 0
        total = subtasks.reduce(function (total, task) {
            return total + parseInt(task.quote)
        },req.body.quote)

        // save quote
        await quote.updateOne({
            $set: {
                ...req.body,
                total: total
            }})

        res.json(total)
    } catch (err) {
        res.status(500).json(err)
    }
}

// ***** UPDATE SUBTASK *****
const updateSubtask = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(user._id.toString() !== req.user._id.toString()) return res.status(404).json("Not authorised")

        // get main quote
        const quote = await Quotes.findById(req.body.mainTaskId)

        // get other subtasks
        const subtasks = await Quotes.find({
            mainTaskId: req.body.mainTaskId,
            _id: {$ne: req.params.quoteId}
        })
        
        // add up total cost of main quote and this subtask
        const startTotal = parseInt(quote.quote) + parseInt(req.body.quote)
    
        // if there are more subtasks, add them to total
        let total
        if(subtasks.length >= 0) {
            total = subtasks.reduce(function (total, task) {
                return total + parseInt(task.quote)
            }, startTotal)
        }
        // else overall total is main quote total
        else {
            total = quote.quote
        }
    
        // save updated total in main quote
        await quote.updateOne({
            $set: {
                total: total
            }})

        // save updated subtask
        await Quotes.findByIdAndUpdate(req.params.quoteId, {$set: req.body})

        res.json(total)
    } catch (err) {
        res.status(500).json(err)
    }
}

// ***** DELETE QUOTE *****
const deleteQuote = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(user._id.toString() !== req.user._id.toString()) return res.status(404).json("Not authorised")

        // get quote
        const quote = await Quotes.findById(req.params.quoteId)

        // delete subtasks
        if(quote.mainTaskId === '') {
            await Quotes.deleteMany({mainTaskId: quote._id})
        }

        // update total of main quote by subtracting the total of this quote
        else {
            const mainQuote = Quotes.findById(quote.mainTaskId)
            await mainQuote.updateOne({
                $inc: {
                    total: -quote.quote
                }
            })
        }

        // delete quote
        await Quotes.findByIdAndDelete(req.params.quoteId)
        return res.json("Quote deleted")
    } catch (err) {
        res.status(500).json(err)
    }
}

// TODO ***** COMBINE QUOTES *****
const combineQuotes = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(user._id.toString() !== req.user._id.toString()) return res.status(404).json("Not authorised")
        
        const quotes = await quotes.find({
            '_id': {
                $in: req.body
            }
        })

        // ... to complete

        res.json("Quotes combined")
    } catch (err) {
        console.error(err.response.data)
    }
}

export default {
    getUsersQuotes, getQuote, calcQuote, addQuote, updateQuote, updateSubtask, deleteQuote, combineQuotes
}