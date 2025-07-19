async function filterRequests() {
  const source = document.getElementById('sourceFilter').value;
  const level = document.getElementById('levelFilter').value;

  const res = await fetch('verification.json');
  const data = await res.json();
  const filtered = data.requests.filter(r =>
    (source === 'Усі' || r.source === source) &&
    (level === 'Усі' || r.level === level)
  );

  const table = document.getElementById('submissionRows');
  table.innerHTML = '';
  filtered.forEach(r => {
    const row = `<tr>
      <td>${r.userDAOid}</td>
      <td>${r.source}</td>
      <td>${r.level}</td>
      <td>${r.date}</td>
      <td>${r.access.join(', ')}</td>
      <td>${r.status}</td>
      <td>
        <button onclick="approve('${r.userDAOid}')">✅ Підтвердити</button>
        <button onclick="reject('${r.userDAOid}')">❌ Відхилити</button>
      </td>
    </tr>`;
    table.innerHTML += row;
  });
}

function approve(id) {
  alert(`✅ Доступ для ${id} підтверджено.`);
  // тут можна додати запис у DAO status.json
}

function reject(id) {
  alert(`❌ Доступ для ${id} відхилено.`);
}
