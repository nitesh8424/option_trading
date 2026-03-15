function generateSignal(data){
 let score = 0;
 if(data.trend === "bullish") score++;
 if(data.pattern === "ORB") score++;
 if(data.optionBreak === "CALL") score++;
 if(data.fiiTrend === "bullish") score++;
 if(score >= 3){
 const entry = data.price + 5;
 return {
 direction:"CALL",
 entry:entry,
 stoploss: entry - 30,
 target1: entry + 40,
 target2: entry + 80
 };
 }
 return null;
}
