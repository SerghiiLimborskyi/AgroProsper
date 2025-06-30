app.get('/api/referral-leaderboard', async (req, res) => {
  try {
    const records = await base('Referrals').select({
      fields: ['ref_id'],
      pageSize: 1000
    }).all();

    const counts = {};
    records.forEach(r => {
      const ref = r.fields.ref_id;
      counts[ref] = (counts[ref] || 0) + 1;
    });

    const leaders = Object.entries(counts)
      .map(([ref_id, count]) => ({ ref_id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    res.json({ leaders });
  } catch (err) {
    console.error('❌ Leaderboard error:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

AgroProsper/
└── api/
    └── referral-leaderboard.js ← Сюди встав код
