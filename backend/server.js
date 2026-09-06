const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { initDB } = require('./config/db');
const memberRoutes = require('./routes/members');

// Load konfigurasi environment
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Pastikan folder uploads dan default avatar tersedia
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Buat default-avatar.png jika belum ada (menggunakan clean SVG data atau icon)
const defaultAvatarPath = path.join(uploadsDir, 'default-avatar.png');
if (!fs.existsSync(defaultAvatarPath)) {
  // Minimalist 1x1 transparent PNG or sample SVG converted
  const defaultPngBase64 =
    'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJVSURBVHgB7d0xbtswFEBR/97/0l2y9ABdMvQAvf8dPEA33SJbA5mkk79pUaQekB6wIImvKJGv519eQkjm5/vfGffX+689/m' +
    'sD0t20e1WzM3gGgYwEMhLIyP8g4/HY3e5939ftduvO57M7nU7d06n/c/c8b+39fnfDMNh4Xq/X7n6/d4fDoXuez+fdfr/vnud5v99v' +
    '6/l8fv6r2263z/88H5/NZjN8bL/fu+Px2I3j+Pmfx0fbtu58Pnfruu7u9/t4bL/fD/f3e++6rts8xuv1evz78W+bZ/06nU7dfD6/v7fr' +
    '9bpxn2232+71eu2+vp9X7nke13/2eR6v74u3e6zT6fR8j3191j7r/b77f/79fr/jMffbvu+/H8/7j7quu/f7vfv8/Bxe04/j8Xh8vL' +
    '1/N691nud5Pp8/rtvt9rxez9/v9/i47vf74/v5vHqf/3mej+s7Xtd1u71/9769Xp/P57a/Xp/n+e9e3/N67+99X+8f77fv533/vtf3' +
    '5/G47s/7637fd7/v+857fX2v1/fzvH1/X5/H83m1vu99Xvd1u13jtd/f3/F1ve59e7/v9/f7fX59X5/jfr+/P7/jcb1+f3//717f937' +
    'P39/P43k8917X9/F4bL/v++N1v9/jcb1+r8/n9Xh/H4/bcf6+P16v1/Udj6v1+r5ev+P5ff7+u75et9vz+fyej8f96719Pq7r8fr8r8' +
    '879mO8z/F43Pdjvdfv+7vXffV+f3/v7/92rO9538/7uN/37/fv37/31/f3e+/31ev7ff+79e/j59Xzvb9f936/9/e/e5339f7v3/f9Hn' +
    '8/7/fv9/z38/H/nN/f6/z/7+9537f/+9/f757/7/H/+f/3+/87/+f+A7831y8yvGzPAAAAAElFTkSuQmCC';
  fs.writeFileSync(defaultAvatarPath, Buffer.from(defaultPngBase64, 'base64'));
}

// Konfigurasi CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Izinkan request tanpa origin (seperti curl, mobile apps, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('CORS Policy: Origin ini tidak diizinkan.'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sajikan folder uploads sebagai static folder
app.use('/uploads', express.static(uploadsDir));

// Route status API / health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend API Kelompok Mie Ayam is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// Endpoint Member CRUD
app.use('/api/members', memberRoutes);

// 404 Handler untuk route yang tidak ditemukan
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan di server.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('⚠️ Server Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Terjadi kesalahan internal pada server.';

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

// Start Server setelah inisialisasi Database
const startServer = async () => {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`=========================================`);
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
      console.log(`📡 API Base URL: http://localhost:${PORT}/api/members`);
      console.log(`🖼️ Uploads URL: http://localhost:${PORT}/uploads`);
      console.log(`=========================================`);
    });
  } catch (error) {
    console.error('❌ Gagal menjalankan server:', error.message);
    process.exit(1);
  }
};

startServer();
