const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const DB_PATH = path.join(__dirname, 'cosma_beauty.db');

// Function to get DB connection
function getDatabase() {
  return new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('✅ Connected to SQLite database');
    }
  });
}

// Function to create tables and seed data
function initializeDatabase() {
  const db = getDatabase();

  // Schema and seed SQL statements
  const createTablesSQL = `
    CREATE TABLE IF NOT EXISTS concerns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS treatments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS concern_treatments (
      concern_id INTEGER,
      treatment_id INTEGER,
      PRIMARY KEY (concern_id, treatment_id),
      FOREIGN KEY (concern_id) REFERENCES concerns(id),
      FOREIGN KEY (treatment_id) REFERENCES treatments(id)
    );

    CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clinic_name TEXT NOT NULL,
      package_name TEXT NOT NULL,
      treatment_id INTEGER,
      price DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (treatment_id) REFERENCES treatments(id)
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      package_id INTEGER,
      user_name TEXT NOT NULL,
      user_email TEXT NOT NULL,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (package_id) REFERENCES packages(id)
    );
  `;

  db.exec(createTablesSQL, (err) => {
    if (err) {
      console.error('Table creation error:', err.message);
      return;
    }
    console.log('✅ Tables created or already exist');

    // Check if concerns already seeded
    db.get('SELECT COUNT(*) as count FROM concerns', (err, row) => {
      if (err) {
        console.error('Count check error:', err.message);
        return;
      }
      if (row.count === 0) {
        // Seed data insertion
        const seedSQL = `
          INSERT INTO concerns (name) VALUES 
          ('acne scars'), ('dark circles'), ('double chin'), ('wrinkles'), ('pigmentation');

          INSERT INTO treatments (name) VALUES
          ('Microneedling'), ('Chemical Peel'), ('Laser Resurfacing'),
          ('Under-eye Filler'), ('PRP Under-eye'), ('HIFU'), ('Kybella');

          INSERT INTO concern_treatments (concern_id, treatment_id) VALUES
          (1, 1), (1, 2), (1, 3),
          (2, 4), (2, 5),
          (3, 6), (3, 7),
          (4, 1), (4, 6),
          (5, 2), (5, 3);

          INSERT INTO packages (clinic_name, package_name, treatment_id, price) VALUES
          ('Glow Clinic', 'Acne Scar Treatment Package', 1, 299.00),
          ('Radiance Center', 'Advanced Microneedling', 1, 399.00),
          ('Beauty Plus', 'Chemical Peel Special', 2, 199.00),
          ('Skin Perfection', 'Laser Resurfacing Premium', 3, 599.00),
          ('Eye Care Clinic', 'Dark Circle Solution', 4, 449.00),
          ('Youth Restore', 'PRP Under-Eye Treatment', 5, 349.00),
          ('Contour Clinic', 'Double Chin HIFU', 6, 799.00),
          ('Sculpt Studio', 'Kybella Fat Reduction', 7, 699.00);
        `;

        db.exec(seedSQL, (err) => {
          if (err) {
            console.error('Seed data insert error:', err.message);
          } else {
            console.log('✅ Seed data inserted successfully');
          }
          db.close();
        });
      } else {
        console.log('✅ Seed data already present');
        db.close();
      }
    });
  });
}

module.exports = { getDatabase, initializeDatabase };
