const axios = require("axios");

async function sendAlertNB(signal) {
    const token = "8721770365:AAFBl3BWS5Z9idiWwyDbIb6g8exqNkokaMM";
    const chat = "2124375058";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const msg = `NIFTY SIGNAL
    Direction: ${signal.direction}
    Entry: ${signal.entry}
    Stoploss: ${signal.stoploss}
    Targets:
    ${signal.target1}
    ${signal.target2}`;
    
    try {
        const data = await axios.post(url, {
            chat_id: chat,
            text: msg
        });
        // console.log('data',data);
    } catch (error) {
        console.log('error',error)
    }
}

async function sendAlertMS(signal) {
    const token = "7919283253:AAGfl4X9LLr4At22gzsp0HaGKndCQ2NY0ms";
    const chat = "6981449785";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const msg = `NIFTY SIGNAL
    Direction: ${signal.direction}
    Entry: ${signal.entry}
    Stoploss: ${signal.stoploss}
    Targets:
    ${signal.target1}
    ${signal.target2}`;

    try {
        const data = await axios.post(url, {
            chat_id: chat,
            text: msg
        });
        // console.log('data',data);
    } catch (error) {
        console.log('error',error)
    }
}

async function sendAlertError({error_msg, message}) {
    const token = "7919283253:AAGfl4X9LLr4At22gzsp0HaGKndCQ2NY0ms";
    const chat = "6981449785";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const msg = error_msg ? `Error - ${error_msg}` : `Message - ${message}`;

    try {
        const data = await axios.post(url, {
            chat_id: chat,
            text: msg
        });
        // console.log('data',data);
    } catch (error) {
        console.log('error',error)
    }
}

module.exports = {sendAlertNB, sendAlertMS, sendAlertError};