import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

export default function DAOAnalytics() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetch('/api/proposals')
      .then(res => res.json())
      .then(data => setProposals(data));
  }, []);

  return (
    <div>
      <h2>📊 DAO-аналітика</h2>
      {proposals.map(p => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <canvas id={`chart-${p.id}`}></canvas>
        </div>
      ))}
    </div>
  );
}
