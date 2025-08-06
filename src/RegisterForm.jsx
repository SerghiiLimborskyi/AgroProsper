<form id="registerForm">
  <label>Ім’я:</label><input type="text" name="name" required>
  <label>Email:</label><input type="email" name="email" required>
  <label>Рахунок (IBAN або крипто):</label><input type="text" name="account">
  <button type="submit">Зареєструватися</button>
</form>

<script>
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const data = new FormData(this);
  const userData = Object.fromEntries(data);
  console.log("Реєстрація:", userData);
  alert("Реєстрація успішна!");
});
</script>
