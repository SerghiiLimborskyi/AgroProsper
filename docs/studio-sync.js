import { fetchStudioIndex, updateStudioIndex } from "./studio-sync.js";

async function syncChanges() {
  const { json, sha } = await fetchStudioIndex();
  json.videos.push(newVideo); // або редагування
  await updateStudioIndex(json, sha);
  alert("✅ studio-index.json оновлено на GitHub");
}
