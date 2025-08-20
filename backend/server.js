const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { initializeDatabase } = require('./database/db');

const searchRoutes = require('./routes/search');
const enquiryRoutes = require('./routes/enquiries');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database (creates tables and seeds data)
initializeDatabase();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/search', searchRoutes);
app.use('/enquiries', enquiryRoutes);
app.use('/admin', adminRoutes);

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Global error handler (optional, you can add your own middleware here)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Cosma Beauty API running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});

module.exports = app;
