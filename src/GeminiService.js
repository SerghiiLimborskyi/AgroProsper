// src/GeminiService.js

export async function askGemini(prompt) {
  const accessToken = await getAccessToken(); // Отримання токена з Firebase Auth

  const response = await fetch(
    'https://us-central1-aiplatform.googleapis.com/v1/projects/agroprosper-1749411381988/locations/us-central1/publishers/google/models/gemini-pro:predict',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: { temperature: 0.7 }
      })
    }
  );

  const data = await response.json();
  return data?.predictions?.[0]?.content || 'Немає відповіді';
}

// 🔐 Отримання токена через Firebase
async function getAccessToken() {
  const user = firebase.auth().currentUser;
  if (!user) throw new Error('Користувач не авторизований');
  return await user.getIdToken();
}
