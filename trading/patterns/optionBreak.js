function optionBreak(price, support, resistance) {
    if (price > resistance) return "CALL";
    if (price < support) return "PUT";
    return null;
}

module.exports = optionBreak;