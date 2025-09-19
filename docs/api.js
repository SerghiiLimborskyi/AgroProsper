import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

const octokit = new Octokit({
  auth: "ghp_YOUR_PERSONAL_ACCESS_TOKEN" // 🔒 Замінити на свій токен
});

const config = {
  owner: "SerghiiLimborskyi",
  repo: "AgroProsper",
  path: "docs/studio-index.json",
  branch: "main"
};

// 🧠 Визначення ролі користувача
export function getUserRole() {
  const cid = localStorage.getItem("userCID") || "";
  if (cid.includes("Partner")) return "partner";
  if (cid.includes("Agent")) return "agent";
  return "guest";
}

// 🌐 Визначення мови браузера
export function getLang() {
  const lang = navigator.language;
  if (lang.startsWith("pl")) return "pl";
  if (lang.startsWith("en")) return "en";
  return "uk";
}

// 🔄 Завантаження JSON з GitHub
export async function fetchStudioIndex() {
  const { data } = await octokit.repos.getContent({
    owner: config.owner,
    repo: config.repo,
    path: config.path,
    ref: config.branch
  });
  const content = atob(data.content);
  return { json: JSON.parse(content), sha: data.sha };
}

// 💾 Оновлення JSON на GitHub
export async function updateStudioIndex(newJson, sha) {
  const content = btoa(JSON.stringify(newJson, null, 2));
  await octokit.repos.createOrUpdateFileContents({
    owner: config.owner,
    repo: config.repo,
    path: config.path,
    message: "🔄 DAO Studio update via api.js",
    content,
    sha,
    branch: config.branch
  });
}

// 🎬 Отримати відео для ролі і мови
export async function getStudioVideo() {
  const { json } = await fetchStudioIndex();
  const role = getUserRole();
  const lang = getLang();
  return json.videos.find(v => v.lang === lang && (v.role === role || v.role === "any"));
}
