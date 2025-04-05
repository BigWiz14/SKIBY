const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Set your PayPal credentials here
const clientId = 'ATemXbUtIXf_-Bk14rqt1ibFqRTeIdBeUeKqCjSnHWgyaS3rsZ0aGhtCfIPQmUiZHhooRr70gdr5kuBu';
const secret = 'EIPI5Ls9zQVW_PH7hfysPiWRO-BkAZa02PIjJBp6njqOzhfOWQsxsdGiO4VaVLBindUy_sxJOnGxfzz7';

// Create an endpoint to handle PayPal payment verification
app.post('/capture-payment', async (req, res) => {
  const { orderID } = req.body;

  try {
    // First, get an access token using the client ID and secret
    const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');
    const authResponse = await axios.post(
      'https://api.sandbox.paypal.com/v1/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = authResponse.data.access_token;

    // Capture the payment using the access token and the order ID
    const captureResponse = await axios.post(
      `https://api.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(captureResponse.data);  // Send captured payment info back to the client
  } catch (error) {
    console.error('Error capturing payment:', error);
    res.status(500).send('Payment capture failed');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
