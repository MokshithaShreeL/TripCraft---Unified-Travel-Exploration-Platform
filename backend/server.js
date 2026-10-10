const app = require('./src/app');
const pool = require('./src/config/database');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    const conn = await pool.getConnection();
    console.log('Connected to MySQL Database: tripcraft_db');
    conn.release();
  } catch (e) {
    console.warn('MySQL connection warning:', e.message);
  }

  app.listen(PORT, () => {
    console.log('=======================================================');
    console.log(` TripCraft API Server running on http://localhost:${PORT}`);
    console.log(` Health Check: http://localhost:${PORT}/api/health`);
    console.log('=======================================================');
  });
}

start();
