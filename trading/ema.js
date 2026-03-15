const { EMA } = require("technicalindicators");
function calculateEMA(prices){
 const ema9 = EMA.calculate({period:9, values:prices});
 const ema20 = EMA.calculate({period:20, values:prices});
 return {
 ema9: ema9[ema9.length-1],
 ema20: ema20[ema20.length-1]
 };
}

module.exports = calculateEMA;