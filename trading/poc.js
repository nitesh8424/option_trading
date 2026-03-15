function calculatePOC(prices, volumes){
 const profile = {};
 for(let i=0;i<prices.length;i++){
 const level = Math.round(prices[i]);
 if(!profile[level]) profile[level] = 0;
 profile[level] += volumes[i];
 }
 let poc = null;
 let maxVolume = 0;
 for(const level in profile){
 if(profile[level] > maxVolume){
 maxVolume = profile[level];
 poc = Number(level);
 }
 }
 return poc;
}

module.exports = calculatePOC;