const express = require('express');
const { getDatabase } = require('../database/db');
const router = express.Router();

router.get('/enquiries', (req, res) => {
  const db = getDatabase();

  const query = `
    SELECT e.id, e.user_name, e.user_email, e.message, e.created_at,
           p.clinic_name, p.package_name, p.price,
           t.name as treatment_name
    FROM enquiries e
    JOIN packages p ON e.package_id = p.id
    JOIN treatments t ON p.treatment_id = t.id
    ORDER BY e.created_at DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      db.close();
      return res.status(500).json({ error: err.message });
    }
    db.close();
    res.json({ enquiries: rows });
  });
});

module.exports = router;
