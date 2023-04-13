import User from "../models/User.js";
import Paygrades from "../models/Paygrades.js";

const getPaygrades = async(req, res) => {
    try {
        const paygrades = await Paygrades.find({})
        res.json(paygrades)
    } catch (err) {
        res.status(500).json(err)
    }
}

const addPaygrade = async (req, res) => {
    try {
        // validate user is admin
        const user = await User.findById(req.params.id)
        if(user._id.toString() !== req.user._id.toString()) return res.status(404).json("Not authorised")
        if(!user.isAdmin) return res.status(404).json("User not granted permission")

        const newPaygrade = new Paygrades(req.body)
        newPaygrade.save()
        res.json("Paygrade added")
    } catch (err) {
        res.status(500).json(err)
    }
}

const updatePaygrades = async(req, res) => {
    try {
        // validate user is admin
        const user = await User.findById(req.params.id)
        if(!user.isAdmin) return res.status(404).json("User not granted permission")

        await Paygrades.findByIdAndUpdate(req.body._id, {$set:{salary:req.body.salary}})
        res.json("Paygrade updated")
    } catch (err) {
        res.status(500).json(err)
    }
}

const deletePaygrades = async(req, res) => {
    try {
        // validate user is admin
        const user = await User.findById(req.params.id)
        if(!user.isAdmin) return res.status(404).json("User not granted permission")

        await Paygrades.findByIdAndDelete(req.body._id)
        res.json("Paygrade deleted")
    } catch (err) {
        res.status(500).json(err)
    }
}

export default {
    getPaygrades, addPaygrade, updatePaygrades, deletePaygrades
}