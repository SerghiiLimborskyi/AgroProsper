const leaderboard = require('./api/referral-leaderboard');
app.use('/api', leaderboard);
const express = require('express');
const app = express();
const registerSeller = require('./api/register-seller');

app.use(express.json());
app.use('/api', registerSeller);

const express = require('express');
const app = express();
const addProduct = require('./api/add-product');

app.use(express.json());
app.use('/api', addProduct);

const createOrder = require('./api/create-order');
app.use(express.json());
app.use('/api', createOrder);

const addTech = require('./api/add-tech');
app.use(express.json());
app.use('/api', addTech);

const mintReward = require('./api/mint-reward');
app.use(express.json());
app.use('/api', mintReward);
