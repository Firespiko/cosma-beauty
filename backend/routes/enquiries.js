const express = require('express');
const { getDatabase } = require('../database/db');
const router = express.Router();

router.post('/', (req, res) => {
  const { package_id, user_name, user_email, message } = req.body;
  if (!package_id || !user_name || !user_email) {
    return res.status(400).json({ error: 'package_id, user_name and user_email are required' });
  }

  const db = getDatabase();

  const query = `
    INSERT INTO enquiries (package_id, user_name, user_email, message)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [package_id, user_name, user_email, message || ''], function(err) {
    if (err) {
      db.close();
      return res.status(500).json({ error: err.message });
    }
    const enquiryId = this.lastID;
    db.close();
    res.status(201).json({ success: true, enquiry_id: enquiryId });
  });
});

module.exports = router;
