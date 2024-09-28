const express = require('express');
const User = require('../models/User');
require('dotenv').config();
const router = express.Router();

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { mobile, email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ mobile, email });
    }
    await user.save();
 
    client.verify.v2.services("VA0392815262dcc597073926a8addaa9cc")
      .verifications
      .create({ to: '+916306245995', channel: 'sms' })
      .then(verification => console.log(verification.url));

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending OTP', error });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { otp } = req.body;

  client.verify.v2.services("VA0392815262dcc597073926a8addaa9cc")
      .verificationChecks
      .create({ to: '+916306245995', code: otp }) 
      .then(verification_check => {
          if (verification_check.status === "approved") {
              return res.json({ message: 'OTP verified successfully' });
          } else {
              return res.status(400).json({ message: 'Invalid or expired OTP' });
          }
      })
      .catch(error => console.error(error));

});

module.exports = router;
