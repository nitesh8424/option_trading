function optionLevels(optionChain) {
    let maxCallOI = 0;
    let maxPutOI = 0;
    let resistance;
    let support;
    optionChain.forEach(strike => {
        if (strike.CE && strike.CE.openInterest > maxCallOI) {
            maxCallOI = strike.CE.openInterest;
            resistance = strike.strikePrice;
        }
        if (strike.PE && strike.PE.openInterest > maxPutOI) {
            maxPutOI = strike.PE.openInterest;
            support = strike.strikePrice;
        }
    });
    return { support, resistance };
}

module.exports = optionLevels;