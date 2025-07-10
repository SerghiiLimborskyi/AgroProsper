# 🗺️ Localization Guide for AgroProsper DAO WebApp

Цей гайд допомагає додавати нові мовні версії стартової сторінки (`index.html`) та інших DAO-маршрутів із автоматичним або ручним перемикачем мови.

---

## 🌐 Структура локалізації

AgroProsper підтримує багатомовні `index.html`, з розміщенням:


---

## 🔀 Автоматичне перенаправлення

`promo/index.html` використовує `navigator.language`, щоб переадресувати на локалізовану версію:

```html
<script>
  const lang = navigator.language || navigator.userLanguage;
  if (lang.startsWith('uk')) {
    window.location.href = '../index-uk.html';
  } else if (lang.startsWith('pl')) {
    window.location.href = '../index-pl.html';
  } else {
    window.location.href = '../index-en.html';
  }
</script>
