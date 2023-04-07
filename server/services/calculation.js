import Paygrades from "../models/Paygrades.js";

export const calculateQuote = async(resources) => {
    // first, calculate the fudge factor
    if(resources.fudgeFactor) {
        fudgeFactor(resources)
    }
    
    // fetch paygrade
    const paygrades = await Paygrades.find({})

    // calculate total of human resources
    const hr = resources.humanResources.reduce(function (total, obj) {
        console.log(obj.paygrade)
        const paygrade = paygrades.find(paygrade => paygrade.type === obj.paygrade)
        return total + (obj.workers * paygrade.salary * obj.time)
    }, 0)
    console.log(hr)
    
    // if no physical resources, return hr
    if(resources.physicalResources.length === 0) {
        return hr
    }

    // calculate total of physical resources
    const pr = resources.physicalResources.reduce(function (total, obj) {
        return total + obj.cost // FIXME
    }, 0)

    // then, add up and return cost of all resources
    const quoteTotal = parseInt(hr) + parseInt(pr)
    console.log(quoteTotal)
    return parseInt(quoteTotal).toFixed(2)
}

const fudgeFactor = (resources) => {
    const randomResource = resources.humanResources[Math.floor(Math.random() * resources.humanResources.length)]
    const keys = Object.keys(randomResource)
    const randomKey = keys[Math.floor(Math.random() * keys.length)]
    const randomVal = randomResource[randomKey]
    const fudgeFactor = Math.floor(Math.random() * (15-5) + 5) / 100
    randomResource[randomKey] = randomVal * fudgeFactor
}