function liquiditySweep(price, support, resistance) {
    if (price < support - 5) return "bullTrap";
    if (price > resistance + 5) return "bearTrap";
    return null;
}

module.exports = liquiditySweep;
