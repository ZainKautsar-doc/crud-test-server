const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const upload = require('../middleware/multer');

// Middleware helper untuk menangani error Multer secara langsung jika ukuran melebihi batas atau format salah
const handleUpload = (req, res, next) => {
  const uploadSingle = upload.single('foto');

  uploadSingle(req, res, function (err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'Ukuran file foto melebihi batas maksimal 5MB.',
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'Gagal mengupload file foto.',
      });
    }
    next();
  });
};

// Routes CRUD
router.get('/', memberController.getAllMembers);
router.get('/:id', memberController.getMemberById);
router.post('/', handleUpload, memberController.createMember);
router.put('/:id', handleUpload, memberController.updateMember);
router.delete('/:id', memberController.deleteMember);

module.exports = router;
