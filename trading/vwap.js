function calculateVWAP(prices, volumes){
 let pv = 0;
 let totalVolume = 0;
 for(let i=0;i<prices.length;i++){
 pv += prices[i] * volumes[i];
 totalVolume += volumes[i];
 }
 return pv / totalVolume;
}


module.exports = calculateVWAP;