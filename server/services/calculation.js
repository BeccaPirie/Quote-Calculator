export const calculateQuote = (quote, ff) => {
    
    // first, calculate the fudge factor
    if(ff) {
        fudgeFactor(quote)
    }   

    // then, add up all human resources and all physical resources
    const hr = quote.humanResources.reduce((total, res) => {
        const cost = res.workers * res.rate * res.time // ***
        return total + cost
    })

    const pr = quote.physicalResources.reduce((total, res) => {
        return total + res.cost // ***
    })

    // then, add up and return cost of all resources
    return hr + pr
}

const fudgeFactor = (quote) => {
    const randomResource = quote.humanResources[Math.floor(Math.random() * quote.humanResources.length)]
    const keys = Object.keys(randomResource)
    const randomKey = keys[Math.floor(Math.random() * keys.length)]
    const randomVal = randomResource[randomKey]
    const fudgeFactor = Math.floor(Math.random() * (15-5) + 5) / 100
    randomResource[randomKey] = randomVal * fudgeFactor
}