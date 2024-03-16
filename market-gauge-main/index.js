// Simulated data array (replace with your actual data source)
const datas = [
    { symbol: "TSLA", value: "HOLD" },
    { symbol: "AAPL", value: "STRONG BUY" },
    { symbol: "TSLA", value: "HOLD" },
    { symbol: "AMZN", value: "SELL" },
    { symbol: "AMZN", value: "STRONG SELL" },
    { symbol: "AMZN", value: "BUY" }
];

let counterSell = 0;
let counterBuy = 0;
let counterStrongSell = 0;
let counterStrongBuy = 0;
let counterHold = 0;
let currentDataIndex = 0;

function updateTicker() {
    const currentData = datas[currentDataIndex];

    // Update counters
    switch (currentData.value) {
        case "STRONG BUY":
            counterStrongBuy++;
            break;
        case "BUY":
            counterBuy++;
            break;
        case "SELL":
            counterSell++;
            break;
        case "STRONG SELL":
            counterStrongSell++;
            break;
        case "HOLD":
            counterHold++;
            break;
        default:
            break;
    }

    currentDataIndex = (currentDataIndex + 1) % datas.length; // Loop through data array
    return currentData;
}

// Function to format news data for SMS
function formatNewsData(data) {
    return `Symbol: ${data.symbol}\nValue: ${data.value}`;
}

// Use Africa's Talking API to send SMS
function sendSMS(message) {
    const africastalking = require('africastalking');

    const client = africastalking({
        apiKey: 'c1f548d6541527b9272ae87c1b8a9d670514b8ecedcea094325f2d0181410832',
        username: 'sandbox'
    });

    // Replace the recipient number with the user's phone number
    const recipient = '+254768899729'; // Example phone number

    client.SMS.send({
        to: recipient,
        message: message,
        from: 'MARKET-GAUGE'
    }).then(() => console.log("Message sent successfully"))
      .catch(err => console.error("Error sending message:", err));
}

// Update ticker every 10 seconds
setInterval(() => {
    const newsData = updateTicker();
    const formattedMessage = formatNewsData(newsData);
    sendSMS(formattedMessage);
}, 10000); // Update ticker every 10 seconds
