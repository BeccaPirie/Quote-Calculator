import Paygrades from "../models/Paygrades.js";

export const calculateQuote = async(obj) => {

    // first, split resources by type
    const humanResources = obj.resources.filter(resource => resource.type === "Human Resource")
    const physicalResources = obj.resources.filter(resource => resource.type === "Physical Resource")
    
    // calculate the fudge factor
    if(obj.fudgeFactor) {
        fudgeFactor(humanResources)
    }

    // fetch paygrade
    const paygrades = await Paygrades.find({})

    // calculate total of human resources
    const hr = humanResources.reduce(function (total, obj) {
        const paygrade = paygrades.find(paygrade => paygrade.type === obj.paygrade)
        return total + (obj.workers * paygrade.salary * obj.time)
    }, 0)
    console.log(hr)
    
    // if no physical resources, return hr
    if(physicalResources.length === 0) {
        return hr
    }

    // calculate total of physical resources
    const pr = physicalResources.reduce(function (total, obj) {
        return total + obj.cost // FIXME
    }, 0)

    // then, add up and return cost of all resources
    const quoteTotal = parseInt(hr) + parseInt(pr)
    console.log(quoteTotal)
    return parseInt(quoteTotal).toFixed(2)
}

const fudgeFactor = (resources) => {
    const randomResource = resources[Math.floor(Math.random() * resources.length)]
    const keys = Object.keys(randomResource)
    const randomKey = keys[Math.floor(Math.random() * keys.length)]
    const randomVal = randomResource[randomKey]
    const fudgeFactor = Math.floor(Math.random() * (15-5) + 5) / 100
    randomResource[randomKey] = randomVal * fudgeFactor
}