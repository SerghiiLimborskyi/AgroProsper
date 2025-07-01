app.get('/api/my-orders', async (req, res) => {
  const ref = req.query.ref;
  if (!ref) return res.status(400).json({ error: 'Missing ref' });

  try {
    const records = await base('Orders').select({
      filterByFormula: `{ref_id} = '${ref}'`,
      sort: [{ field: 'timestamp', direction: 'desc' }],
      maxRecords: 100
    }).all();

    const orders = records.map(r => ({
      product: r.fields.product,
      region: r.fields.region,
      amount: r.fields.amount,
      buyer_contact: r.fields.buyer_contact,
      timestamp: r.fields.timestamp
    }));

    res.json({ orders });
  } catch (err) {
    console.error('❌ MyOrders error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});
