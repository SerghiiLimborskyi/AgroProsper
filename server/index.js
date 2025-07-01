const leaderboard = require('./api/referral-leaderboard');
app.use('/api', leaderboard);
const express = require('express');
const app = express();
const registerSeller = require('./api/register-seller');

app.use(express.json());
app.use('/api', registerSeller);
