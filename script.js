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
