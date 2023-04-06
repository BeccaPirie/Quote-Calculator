import User from "../models/User.js";
import Paygrades from "../models/Paygrades.js";

const getPaygrades = async(req, res) => {
    try {
        // validate user is admin?
        const paygrades = await Paygrades.find({})
        res.json(paygrades)
    } catch (err) {
        res.status(500).json(err)
    }
}

const addPaygrade = async (req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json(err)
    }
}

const updatePaygrades = async(req, res) => {
    try {
        // validate user is admin?
       
    } catch (err) {
        res.status(500).json(err)
    }
}

const deletePaygrades = async(req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json(err)
    }
}

export default {
    getPaygrades, addPaygrade, updatePaygrades, deletePaygrades
}