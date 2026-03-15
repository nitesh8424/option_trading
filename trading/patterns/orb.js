function detectORB(candles) {
    const high = Math.max(...candles.slice(0, 3).map(c => c.high));
    const low = Math.min(...candles.slice(0, 3).map(c => c.low));
    return { high, low };
}

module.exports = detectORB;