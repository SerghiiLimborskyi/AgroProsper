document.addEventListener("DOMContentLoaded", function () {
    // Чат-бот інтеграція
    let chatBot = document.getElementById("chatbot");
    chatBot.innerHTML = "Привіт! Я бот AgroProsper. Як можу допомогти?";

    // Автоматична зміна рекламних банерів
    let banner = document.getElementById("banner");
    let banners = ["banner1.jpg", "banner2.jpg", "banner3.jpg"];
    setInterval(() => {
        let randomIndex = Math.floor(Math.random() * banners.length);
        banner.src = "images/" + banners[randomIndex];
    }, 5000);

    // Моніторинг фінансів
    function trackFinance(income, expenses) {
        return income - expenses;
    }
});
async function getCommodityPrice(commodity) {
    let response = await fetch(`https://api.api-ninjas.com/v1/commodityprice?name=${commodity}`, {
        headers: { "X-Api-Key": "ВАШ_API_КЛЮЧ" }
    });
    let data = await response.json();
    console.log(`Ціна ${commodity}: $${data.price}`);
}
getCommodityPrice("wheat"); // Отримати ціну на пшеницю
async function registerWithGoogle() {
    let response = await fetch("https://accounts.google.com/o/oauth2/auth", {
        method: "POST",
        headers: { "Authorization": "Bearer ВАШ_API_КЛЮЧ" }
    });
    let data = await response.json();
    console.log(`Користувач зареєстрований: ${data.email}`);
}

async function registerWithMicrosoft() {
    let response = await fetch("https://login.microsoftonline.com/oauth2/v2.0/authorize", {
        method: "POST",
        headers: { "Authorization": "Bearer ВАШ_API_КЛЮЧ" }
    });
    let data = await response.json();
    console.log(`Реєстрація через Microsoft: ${data.email}`);
}
async function registerWithGoogle() {
    let response = await fetch("https://accounts.google.com/o/oauth2/auth", {
        method: "POST",
        headers: { "Authorization": "Bearer ВАШ_API_КЛЮЧ" }
    });
    let data = await response.json();
    console.log(`Користувач зареєстрований через Google: ${data.email}`);
}
async function registerWithMicrosoft() {
    let response = await fetch("https://login.microsoftonline.com/oauth2/v2.0/authorize", {
        method: "POST",
        headers: { "Authorization": "Bearer ВАШ_API_КЛЮЧ" }
    });
    let data = await response.json();
    console.log(`Користувач зареєстрований через Microsoft: ${data.email}`);
}
function checkAgreementStatus(user) {
    if (user.hasSignedAgreement) {
        let commission = user.paymentAmount * 0.10;
        console.log(`Комісія за угоду: ${commission} USD`);
    } else {
        console.log("Користувач не підписав угоду.");
    }
}
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'ВАШ_КОД_АНАЛІТИКИ', 'auto');
ga('send', 'pageview');
async function getMarketTrends() {
    let response = await fetch("https://api.agroanalytics.com/trends", {
        headers: { "Authorization": "Bearer ВАШ_API_КЛЮЧ" }
    });
    let data = await response.json();
    console.log(`Прогноз ринку: ${data.trends}`);
}
getMarketTrends();
async function detectUserLanguage() {
    let userLang = navigator.language || navigator.userLanguage;
    document.documentElement.lang = userLang;
    console.log(`Мова користувача: ${userLang}`);
}
detectUserLanguage();
async function postAdToSocial(platform, adContent) {
    let response = await fetch(`https://api.${platform}.com/post`, {
        method: "POST",
        headers: { "Authorization": "Bearer ВАШ_API_КЛЮЧ" },
        body: JSON.stringify({ content: adContent })
    });
    let result = await response.json();
    console.log(`Реклама на ${platform}: ${result.status}`);
}
postAdToSocial("facebook", "AgroProsper – інновації агробізнесу!");
require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// 🔐 Перевірка токена
app.post('/api/secure-endpoint', (req, res) => {
  const token = req.headers['authorization'];
  const secret = process.env.BOT_SECRET_KEY;
  if (token !== `Bearer ${secret}`) return res.status(403).json({ error: '❌ Невірний токен' });
  res.json({ message: '✅ Авторизовано!' });
});

// 🔧 Генерація токена з панелі
app.post('/api/admin/gen-token', (req, res) => {
  const token = crypto.randomBytes(32).toString('hex');
  res.json({ token, created: new Date() });
});

app.listen(process.env.PORT || 3001, () => console.log('🔒 Backend OK'));
API_ACCESS_TOKEN=ваш_токен_доступу_до_API
BOT_SECRET_KEY=секретний_ключ_для_бота
const crypto = require('crypto');
const fs = require('fs');
const token = crypto.randomBytes(32).toString('hex');
fs.writeFileSync('.env', `BOT_SECRET_KEY=${token}\n`, { flag: 'a' });
console.log('✅ BOT_SECRET_KEY створено та збережено у .env');
const fs = require('fs');
const files = ['.env', 'backend/index.js'];
const regex = /(ghp|github_pat|token|secret)[^\s"']{10,}/gi;
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(regex);
  if (matches) console.warn(`⚠️ ${f} →`, matches);
});
