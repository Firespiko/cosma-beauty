const express = require('express');
const { getDatabase } = require('../database/db');
const router = express.Router();

router.get('/', (req, res) => {
  const { concern } = req.query;
  if (!concern) {
    return res.status(400).json({ error: 'Concern parameter is required' });
  }

  const db = getDatabase();

  const sql = `
    SELECT 
      c.id as concern_id, c.name as concern_name,
      t.id as treatment_id, t.name as treatment_name,
      p.id as package_id, p.clinic_name, p.package_name, p.price
    FROM concerns c
    LEFT JOIN concern_treatments ct ON c.id = ct.concern_id
    LEFT JOIN treatments t ON ct.treatment_id = t.id
    LEFT JOIN packages p ON t.id = p.treatment_id
    WHERE LOWER(c.name) LIKE ?
    ORDER BY p.price ASC
  `;

  db.all(sql, [`%${concern.toLowerCase()}%`], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    if (rows.length === 0) {
      return res.json({ concern: null, treatments: [], packages: [], message: 'No treatments found' });
    }

    const concernObj = { id: rows[0].concern_id, name: rows.concern_name };

    const treatments = [...new Set(rows.filter(r => r.treatment_id).map(r => JSON.stringify({
      id: r.treatment_id,
      name: r.treatment_name
    })))].map(JSON.parse);

    const packages = rows.filter(r => r.package_id).map(r => ({
      id: r.package_id,
      clinic_name: r.clinic_name,
      package_name: r.package_name,
      price: r.price,
      treatment_id: r.treatment_id
    }));

    db.close();
    res.json({ concern: concernObj, treatments, packages });
  });
});

module.exports = router;
