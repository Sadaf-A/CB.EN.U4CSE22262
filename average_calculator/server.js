const express = require('express');
const axios = require('axios');

// Initializing environment
const app = express();
const PORT = 9876;
const WINDOW_SIZE = 5;
const TIMEOUT = 500;

// Sources to fetch data
const numberSources = {
  p: 'http://20.244.56.144/evaluation-service/primes',
  f: 'http://20.244.56.144/evaluation-service/fibo',
  e: 'http://20.244.56.144/evaluation-service/even',
  r: 'http://20.244.56.144/evaluation-service/rand'
};

let windowNumbers = [];     
// Set Data Structure to maintain uniqueness  
let numberSet = new Set();    

const authPayload = {
  email: "cb.en.u4cse22262@cb.students.amrita.edu",
  name: "Sadaf Ahmed",
  rollNo: "CB.EN.U4CSE22262",
  accessCode: "SwuuKE",
  clientID: "debf172d-8e15-4a37-82c9-47f70c2b3b78",
  clientSecret: "eaYmgrrvzvBcSbCY"
};

let cachedToken = null;
let tokenExpiry = 0;

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && tokenExpiry > now) {
    return cachedToken;
  }

  try {
    // Get Authorization Token for the third Party API
    const response = await axios.post('http://20.244.56.144/evaluation-service/auth', authPayload);
    cachedToken = response.data.access_token;
    tokenExpiry = response.data.expires_in; 
    return cachedToken;
  } catch (err) {
    console.error("Token fetch failed:", err.message);
    throw new Error("Authentication failed");
  }
}
// API for average calculation with handling for different types
app.get('/numbers/:type', async (req, res) => {
  const type = req.params.type;
  const apiUrl = numberSources[type];

  if (!apiUrl) {
    return res.status(400).json({ error: 'Invalid number type. Use p, f, e, or r.' });
  }

  const windowPrevState = [...windowNumbers];
  let newNumbers = [];

  try {
    const token = await getAccessToken();
    const response = await axios.get(apiUrl, {
      timeout: TIMEOUT,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    newNumbers = response.data.numbers || [];

    newNumbers.forEach(num => {
      if (!numberSet.has(num)) {
        windowNumbers.push(num);
        numberSet.add(num);

        if (windowNumbers.length > WINDOW_SIZE) {
          const removed = windowNumbers.shift();
          numberSet.delete(removed);
        }
      }
    });

  } catch (error) {
    console.warn("Fetch failed or timed out:", error.message);
    return res.json({
      windowPrevState,
      windowCurrState: windowPrevState,
      numbers: [],
      avg: parseFloat(calculateAverage(windowNumbers).toFixed(2))
    });
  }

  const avg = calculateAverage(windowNumbers);

  res.json({
    windowPrevState,
    windowCurrState: [...windowNumbers],
    numbers: newNumbers,
    avg: parseFloat(avg.toFixed(2))
  });
});

// function to calculate average
function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum / numbers.length;
}

app.listen(PORT, () => {
  console.log(`Average Calculator running at port : ${PORT}`);
});
