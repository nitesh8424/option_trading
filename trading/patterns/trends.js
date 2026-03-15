function detectTrend(price, vwap, ema9, ema20) {
    if (price > vwap && ema9 > ema20) return "bullish";
    if (price < vwap && ema9 < ema20) return "bearish";
    return "sideways";
}

module.exports = detectTrend;