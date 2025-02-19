const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('@line/bot-sdk');

const app = express();
const port = process.env.PORT || 3000;

const config = {
    channelAccessToken: 'hfgkDnqMq34cYKn10WvUuVCLDT1w2S+PwKHf5F9x98eqIII3Iix12hOOOuu583hHfp3KyJfz/HHiAQjDOpJsdyz5svWAgulcsPCCGsZwA4iXnVein1xpk9vd7iGy8yURJwBA8r3d+RRONR3mHrhdpgdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'f2845436bf74e036f4cd91f951e82a32'
  };

const client = new Client(config);

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const events = req.body.events;

  Promise.all(events.map(event => {
    if (event.type === 'message' && event.message.type === 'text') {
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: `You said: ${event.message.text}`
      });
    }
  }))
  .then(() => res.status(200).send('OK'))
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
