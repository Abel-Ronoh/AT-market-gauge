const tickerText = document.getElementById("ticker-text");
const tickerValue = document.getElementById("ticker-value");
const tickerSymbol = document.getElementById("ticker-symbol");
const gaugeNeedles = document.getElementById("gauge-needle");
var sellCounter = document.getElementById("sellCounter")
var buyCounter = document.getElementById("buyCounter")
var holdCounter = document.getElementById("holdCounter")

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
sellCounter.style.color = 'red'
buyCounter.style.color = 'blue'
holdCounter.style.color = 'orange'
var timer = 0

function updateTicker() {
    const currentData = datas[currentDataIndex];
    // tickerText.textContent = `${currentData.symbol}`;
    tickerValue.textContent = currentData.value;
    
    // Update gauge based on value
    gaugeNeedles.classList.remove("buy", "sell", 'strongbuy', "strongsell");
    if (currentData.value === "STRONG BUY") {
        tickerValue.style.color = "blue"
        gaugeNeedles.classList.add("strongbuy");
        timer = 150000
        counterBuy +=1
        buyCounter.textContent = counterBuy
    } else if (currentData.value === "SELL") {
        tickerValue.style.color = "red"
        gaugeNeedles.classList.add("sell");
        timer = 150000
        counterSell +=1
        sellCounter.textContent = counterSell
    }else if (currentData.value == "HOLD"){
        tickerValue.style.color = "#5C5C5C"
        timer = 3000
        counterHold +=1
        holdCounter.textContent = counterHold
    }else if (currentData.value === "BUY") {
        tickerValue.style.color = "blue"
        gaugeNeedles.classList.add("buy");
        timer = 150000
        counterBuy +=1
        buyCounter.textContent = counterBuy
    }else if (currentData.value === "STRONG SELL") {
        tickerValue.style.color = "red"
        gaugeNeedles.classList.add("strongsell");
        timer = 150000
        counterSell +=1
        sellCounter.textContent = counterSell
    }
    

    currentDataIndex = (currentDataIndex + 1) % datas.length; // Loop through data array
}


setInterval(updateTicker, 10000); // Update ticker every 3 seconds

updateTicker(); // Initial update
