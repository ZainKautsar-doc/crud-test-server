const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  database: process.env.DB_NAME || 'kelompok_mie_ayam',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool = null;

/**
 * Inisialisasi Database dan Tabel members secara otomatis
 */
const initDB = async () => {
  try {
    // 1. Buat koneksi awal tanpa memilih database untuk memastikan database ada
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await connection.end();

    // 2. Buat connection pool ke database tujuan
    pool = mysql.createPool(dbConfig);

    // 3. Buat tabel members jika belum ada
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS members (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nama VARCHAR(100) NOT NULL COMMENT 'Nama lengkap member',
        nim VARCHAR(50) NOT NULL UNIQUE COMMENT 'Nomor Induk Mahasiswa (hanya angka)',
        role VARCHAR(100) NOT NULL COMMENT 'Role/posisi di kelompok',
        kontribusi TEXT NOT NULL COMMENT 'Deskripsi kontribusi member',
        foto_path VARCHAR(255) COMMENT 'Path/filename foto profil di folder uploads',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Waktu data dibuat',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Waktu data terakhir diupdate',
        INDEX idx_nim (nim),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await pool.query(createTableQuery);

    // 4. Periksa apakah tabel kosong, jika ya, isi dengan data seed awal
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM members');
    if (rows[0].count === 0) {
      const seedMembers = [
        ['Zain Kautsar Ridha', '247006111153', 'Backend Developer', 'Mengkonfigurasi Proxmox VE dan setup SSH access', 'default-avatar.png'],
        ['M. Nazril Putra R.', '247006111152', 'Infrastructure Engineer', 'Konfigurasi Linux Debian dan networking bridge', 'default-avatar.png'],
        ['Kamila Zahra R.', '247006111151', 'DevOps Engineer', 'Deploy Nginx dan implementasi reverse tunneling', 'default-avatar.png'],
        ['Chintia Aurizki P.', '247006111155', 'System Administrator', 'Alokasi resources dan validasi hypervisor', 'default-avatar.png'],
        ['M. Fasha Ajvikri', '247006111150', 'Documentation Lead', 'Dokumentasi project dan testing', 'default-avatar.png'],
      ];

      const insertQuery = `
        INSERT INTO members (nama, nim, role, kontribusi, foto_path) VALUES ?
      `;
      await pool.query(insertQuery, [seedMembers]);
      console.log('✅ Initial seed data inserted into members table.');
    }

    console.log(`✅ MySQL connected and database "${dbConfig.database}" ready.`);
    return pool;
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    throw error;
  }
};

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
};

module.exports = {
  initDB,
  getPool,
};
