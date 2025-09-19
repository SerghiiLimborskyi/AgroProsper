// server.js (Node.js backend)

import express from "express";
import { Octokit } from "@octokit/rest";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const config = {
  owner: "SerghiiLimborskyi",
  repo: "AgroProsper",
  path: "docs/studio-index.json",
  branch: "main"
};

app.post("/api/update-studio-index", async (req, res) => {
  try {
    const { data } = req.body;
    const file = await octokit.repos.getContent({
      owner: config.owner,
      repo: config.repo,
      path: config.path,
      ref: config.branch
    });

    const sha = file.data.sha;
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");

    await octokit.repos.createOrUpdateFileContents({
      owner: config.owner,
      repo: config.repo,
      path: config.path,
      message: "🔄 Secure update via studio-api.js",
      content,
      sha,
      branch: config.branch
    });

    res.json({ status: "✅ Оновлено успішно" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Помилка оновлення" });
  }
});

app.listen(3000, () => console.log("🚀 Studio API server запущено на порту 3000"));
