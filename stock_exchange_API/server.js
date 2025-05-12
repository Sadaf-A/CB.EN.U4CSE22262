const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;

const AUTH_URL = 'http://20.244.56.144/evaluation-service/auth';
const API_BASE = 'http://20.244.56.144/evaluation-service/stocks';

const AUTH_PAYLOAD = {
  email: "cb.en.u4cse22262@cb.students.amrita.edu",
  name: "Sadaf Ahmed",
  rollNo: "CB.EN.U4CSE22262",
  accessCode: "SwuuKE",
  clientID: "debf172d-8e15-4a37-82c9-47f70c2b3b78",
  clientSecret: "eaYmgrrvzvBcSbCY"
};

// fetch new token
async function getToken() {
  const response = await axios.post(AUTH_URL, AUTH_PAYLOAD);
  return response.data.access_token;
}

// fetch stock price history
async function fetchStockPrices(ticker, minutes, token) {
  const url = `${API_BASE}/${ticker}?minutes=${minutes}`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

// calculate average
function calculateAverage(prices) {
  if (prices.length === 0) return 0;
  const sum = prices.reduce((acc, p) => acc + p.price, 0);
  return sum / prices.length;
}

// calculate pearson correlation
function calculateCorrelation(pricesX, pricesY) {
  const len = Math.min(pricesX.length, pricesY.length);
  if (len < 2) return 0;

  const X = pricesX.slice(-len).map(p => p.price);
  const Y = pricesY.slice(-len).map(p => p.price);

  const meanX = X.reduce((a, b) => a + b) / len;
  const meanY = Y.reduce((a, b) => a + b) / len;

  const covXY = X.reduce((sum, x, i) => sum + (x - meanX) * (Y[i] - meanY), 0);
  const stdX = Math.sqrt(X.reduce((sum, x) => sum + (x - meanX) ** 2, 0));
  const stdY = Math.sqrt(Y.reduce((sum, y) => sum + (y - meanY) ** 2, 0));

  const denominator = stdX * stdY;
  if (denominator === 0) return 0;

  return parseFloat((covXY / denominator).toFixed(4));
}

// average stock price
app.get('/stocks/:ticker', async (req, res) => {
  try {
    const { ticker } = req.params;
    const { minutes, aggregation } = req.query;
    if (aggregation !== 'average') {
      return res.status(400).json({ error: 'Unsupported aggregation type' });
    }

    const token = await getToken();
    const priceHistory = await fetchStockPrices(ticker, minutes, token);

    const averageStockPrice = parseFloat(calculateAverage(priceHistory).toFixed(6));
    res.json({ averageStockPrice, priceHistory });
  } catch (error) {
    console.error('Error in /stocks/:ticker', error.message);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

// correlation between 2 stocks
app.get('/stockcorrelation', async (req, res) => {
  try {
    const { minutes, ticker: tickers } = req.query;
    const tickerArray = Array.isArray(tickers) ? tickers : [tickers];

    if (tickerArray.length !== 2) {
      return res.status(400).json({ error: 'Exactly 2 tickers required for correlation' });
    }

    const token = await getToken();
    const [dataX, dataY] = await Promise.all([
      fetchStockPrices(tickerArray[0], minutes, token),
      fetchStockPrices(tickerArray[1], minutes, token)
    ]);

    const correlation = calculateCorrelation(dataX, dataY);
    const stocks = {
      [tickerArray[0]]: {
        averagePrice: parseFloat(calculateAverage(dataX).toFixed(6)),
        priceHistory: dataX
      },
      [tickerArray[1]]: {
        averagePrice: parseFloat(calculateAverage(dataY).toFixed(6)),
        priceHistory: dataY
      }
    };

    res.json({ correlation, stocks });
  } catch (error) {
    console.error('Error in /stockcorrelation', error.message);
    res.status(500).json({ error: 'Failed to fetch stock correlation data' });
  }
});

app.listen(PORT, () => {
  console.log(`Stock Aggregation Microservice running on http://localhost:${PORT}`);
});
