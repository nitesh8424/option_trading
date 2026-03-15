const cron = require("node-cron");
const axios = require("axios");

const getNiftyPrice = require("./trading/getPrice");
const calculateEMA = require("./trading/ema");
const calculateVWAP = require("./trading/vwap");
const calculatePOC = require("./trading/poc");
const optionLevels = require("./trading/optionLevels");

const detectORB = require("./trading/patterns/orb");
const detectTrend = require("./trading/patterns/trends");
const optionBreak = require("./trading/patterns/optionBreak");
const detectLiquiditySweep = require("./trading/patterns/liquiditySweep");
const sendAlert = require("./trading/sendAlert");
const generateSignal = require("./trading/getSignal");


let prices = [];
let volumes = [];
let candles = [];

async function getFIIDII() {

    try {

        const res = await axios.get(
            "https://www.nseindia.com/api/fiidiiTradeReact",
            { headers: { "User-Agent": "Mozilla/5.0" } }
        );

        const data = res.data;

        return {
            fiiBuy: data.fiiBuy,
            fiiSell: data.fiiSell
        };

    } catch (err) {

        return {
            fiiBuy: 0,
            fiiSell: 0
        };

    }
}

async function runEngine() {

    try {

        const price = await getNiftyPrice();

        prices.push(price);
        volumes.push(Math.random() * 1000);

        candles.push({
            high: price,
            low: price
        });

        if (prices.length < 30) return;

        const ema = calculateEMA(prices);
        const vwap = calculateVWAP(prices, volumes);
        const poc = calculatePOC(prices, volumes);

        const optionData = await axios.get(
            "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY",
            { headers: { "User-Agent": "Mozilla/5.0" } }
        );

        const levels = optionLevels(optionData.data.records.data);

        const trend = detectTrend(price, vwap, ema.ema9, ema.ema20);

        const orb = detectORB(candles);

        const optionSignal = optionBreak(
            price,
            levels.support,
            levels.resistance
        );

        const liquidity = detectLiquiditySweep(
            price,
            levels.support,
            levels.resistance
        );

        const fiiData = await getFIIDII();

        let score = 0;

        if (trend === "bullish") score++;
        if (price > poc) score++;
        if (price > levels.resistance) score++;
        if (optionSignal === "CALL") score++;
        if (liquidity === "bullTrap") score++;
        if (fiiData.fiiBuy > fiiData.fiiSell) score++;

        if (trend === "bearish") score--;
        if (price < levels.support) score--;
        if (optionSignal === "PUT") score--;
        if (liquidity === "bearTrap") score--;
        if (fiiData.fiiSell > fiiData.fiiBuy) score--;

        const signal = generateSignal({
            score,
            price,
            poc,
            support: levels.support,
            resistance: levels.resistance
        });

        if (signal) {

            await sendAlert.sendAlertNB(signal);
            await sendAlert.sendAlertMS(signal);

            console.log("Signal Sent:", signal);

        }

    } catch (err) {
        sendAlert.sendAlertError(err.message);
        console.log("Error:", err.message);

    }

}

runEngine();
cron.schedule("*/20 * * * * *", runEngine);