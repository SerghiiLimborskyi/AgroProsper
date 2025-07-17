async function loadRepoStatus() {
  const response = await fetch("https://api.github.com/repos/SerghiiLimborskyi/AgroProsper/contents/docs");
  const files = await response.json();

  const list = document.getElementById("status-list");
  list.innerHTML = "";

  files.forEach(file => {
    const li = document.createElement("li");
    li.textContent = `📄 ${file.name}`;
    list.appendChild(li);
  });

  const updated = document.getElementById("last-updated");
  updated.textContent = `Оновлено: ${new Date().toLocaleDateString()}`;
}
document.addEventListener("DOMContentLoaded", loadRepoStatus);
