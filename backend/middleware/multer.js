const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan direktori uploads tersedia
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Format: {timestamp}-{originalname-sanitized}
    const cleanFileName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${cleanFileName}`;
    cb(null, filename);
  },
});

// File filter untuk JPG/JPEG/PNG
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp/;
  const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedExtensions.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Format file tidak didukung! Hanya JPG, JPEG, PNG, dan WEBP yang diperbolehkan.'));
  }
};

// Batas 5MB (5 * 1024 * 1024 bytes)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = upload;
