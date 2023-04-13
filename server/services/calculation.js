import Paygrades from "../models/Paygrades.js";

export const calculateQuote = async(obj) => {
    // first, split resources by type
    const humanResources = obj.resources.filter(resource => resource.type === "Human Resource")
    const physicalResources = obj.resources.filter(resource => resource.type === "Physical Resource")
    
    // calculate the fudge factor
    let ff = 1;
    if(obj.fudgeFactor) {
        ff = Math.floor(Math.random() * (15-5) + 5) / 100
    }

    // fetch paygrade
    const paygrades = await Paygrades.find({})

    // calculate total of human resources
    const hr = humanResources.reduce(function (total, obj) {
        const paygrade = paygrades.find(paygrade => paygrade.type === obj.paygrade)

        // multiply salary, hours or number of workers by fudge factor
        const options = [parseInt(paygrade.salary), parseInt(obj.time), parseInt(obj.workers)]
        const random = Math.floor(Math.random() * options.length)
        options[random] *= ff

        // calculate cost of resource
        const value = options.reduce(function (total, val) {
            return total * val
        }, 1)

        // add resource cost to total
        return total + value
    }, 0)
    
    // if no physical resources, return hr
    if(physicalResources.length === 0) {
        return Math.round(hr)
    }

    // calculate total of physical resources
    const pr = physicalResources.reduce(function (total, obj) {
        let cost = parseInt(obj.cost)
        // multiply by number of payments if not one-off
        if(obj.costType !== "One-off Payment") {
            cost *= parseInt(obj.time)
        }
        return total + cost
    }, 0)

    // then, add up and return cost of all resources
    const total = Math.round(hr + pr)
    return total
}