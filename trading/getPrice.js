const axios = require("axios");
async function getNiftyPrice(){
 const url = "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050";
 const headers = {
 "User-Agent": "Mozilla/5.0",
 "Accept": "application/json"
 };
 const res = await axios.get(url,{headers});
 return res.data.data[0].lastPrice;
}
module.exports = getNiftyPrice;
