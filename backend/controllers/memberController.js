const fs = require('fs');
const path = require('path');
const { getPool } = require('../config/db');

// Helper untuk menghapus file fisik di folder uploads
const removeFileIfExists = (fileName) => {
  if (!fileName || fileName === 'default-avatar.png') return;
  try {
    const filePath = path.join(__dirname, '../uploads', fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.warn(`Gagal menghapus file ${fileName}:`, err.message);
  }
};

// Helper untuk format member data dengan foto_url
const formatMember = (member, req) => {
  const host = req.get('host') || 'localhost:5000';
  const protocol = req.protocol || 'http';
  const fotoPath = member.foto_path || 'default-avatar.png';
  return {
    ...member,
    foto_url: `${protocol}://${host}/uploads/${fotoPath}`,
  };
};

/**
 * GET /api/members
 * Mengambil semua data anggota, diurutkan berdasarkan ID ascending
 */
const getAllMembers = async (req, res, next) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM members ORDER BY id ASC');
    const membersWithUrl = rows.map((m) => formatMember(m, req));

    return res.status(200).json({
      success: true,
      count: membersWithUrl.length,
      data: membersWithUrl,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/members/:id
 * Mengambil detail satu anggota berdasarkan ID
 */
const getMemberById = async (req, res, next) => {
  try {
    const pool = getPool();
    const { id } = req.params;

    const [rows] = await pool.query('SELECT * FROM members WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Member dengan ID ${id} tidak ditemukan.`,
      });
    }

    return res.status(200).json({
      success: true,
      data: formatMember(rows[0], req),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/members
 * Menambahkan anggota baru (dengan upload foto)
 */
const createMember = async (req, res, next) => {
  try {
    const pool = getPool();
    const { nama, nim, role, kontribusi } = req.body;

    // Validasi field required
    if (!nama || !nama.trim()) {
      if (req.file) removeFileIfExists(req.file.filename);
      return res.status(400).json({ success: false, message: 'Nama lengkap wajib diisi.' });
    }

    if (!nim || !nim.trim()) {
      if (req.file) removeFileIfExists(req.file.filename);
      return res.status(400).json({ success: false, message: 'NIM wajib diisi.' });
    }

    // Validasi format NIM (hanya angka)
    const cleanNim = nim.trim();
    if (!/^\d+$/.test(cleanNim)) {
      if (req.file) removeFileIfExists(req.file.filename);
      return res.status(400).json({
        success: false,
        message: 'Format NIM tidak valid. NIM harus berupa angka saja tanpa huruf atau simbol.',
      });
    }

    if (!role || !role.trim()) {
      if (req.file) removeFileIfExists(req.file.filename);
      return res.status(400).json({ success: false, message: 'Role anggota wajib diisi.' });
    }

    if (!kontribusi || !kontribusi.trim()) {
      if (req.file) removeFileIfExists(req.file.filename);
      return res.status(400).json({ success: false, message: 'Deskripsi kontribusi wajib diisi.' });
    }

    // Cek duplikasi NIM
    const [existing] = await pool.query('SELECT id FROM members WHERE nim = ?', [cleanNim]);
    if (existing.length > 0) {
      if (req.file) removeFileIfExists(req.file.filename);
      return res.status(400).json({
        success: false,
        message: `NIM ${cleanNim} sudah terdaftar. Gunakan NIM lain yang unik.`,
      });
    }

    const foto_path = req.file ? req.file.filename : 'default-avatar.png';

    const insertQuery = `
      INSERT INTO members (nama, nim, role, kontribusi, foto_path)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(insertQuery, [
      nama.trim(),
      cleanNim,
      role.trim(),
      kontribusi.trim(),
      foto_path,
    ]);

    const newMemberId = result.insertId;
    const [newMemberRows] = await pool.query('SELECT * FROM members WHERE id = ?', [newMemberId]);

    return res.status(201).json({
      success: true,
      message: 'Anggota berhasil ditambahkan.',
      data: formatMember(newMemberRows[0], req),
    });
  } catch (error) {
    if (req.file) removeFileIfExists(req.file.filename);
    next(error);
  }
};

/**
 * PUT /api/members/:id
 * Mengupdate data anggota (foto bersifat opsional)
 */
const updateMember = async (req, res, next) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const { nama, nim, role, kontribusi } = req.body;

    // Cek apakah member dengan id tersebut ada
    const [existingRows] = await pool.query('SELECT * FROM members WHERE id = ?', [id]);
    if (existingRows.length === 0) {
      if (req.file) removeFileIfExists(req.file.filename);
      return res.status(404).json({
        success: false,
        message: `Member dengan ID ${id} tidak ditemukan.`,
      });
    }

    const currentMember = existingRows[0];

    // Validasi field required
    if (!nama || !nama.trim()) {
      if (req.file) removeFileIfExists(req.file.filename);
      return res.status(400).json({ success: false, message: 'Nama lengkap wajib diisi.' });
    }

    if (!nim || !nim.trim()) {
      if (req.file) removeFileIfExists(req.file.filename);
      return res.status(400).json({ success: false, message: 'NIM wajib diisi.' });
    }

    const cleanNim = nim.trim();
    if (!/^\d+$/.test(cleanNim)) {
      if (req.file) removeFileIfExists(req.file.filename);
      return res.status(400).json({
        success: false,
        message: 'Format NIM tidak valid. NIM harus berupa angka saja tanpa huruf atau simbol.',
      });
    }

    if (!role || !role.trim()) {
      if (req.file) removeFileIfExists(req.file.filename);
      return res.status(400).json({ success: false, message: 'Role anggota wajib diisi.' });
    }

    if (!kontribusi || !kontribusi.trim()) {
      if (req.file) removeFileIfExists(req.file.filename);
      return res.status(400).json({ success: false, message: 'Deskripsi kontribusi wajib diisi.' });
    }

    // Cek apakah NIM dipakai oleh member lain
    const [duplicateNim] = await pool.query(
      'SELECT id FROM members WHERE nim = ? AND id != ?',
      [cleanNim, id]
    );
    if (duplicateNim.length > 0) {
      if (req.file) removeFileIfExists(req.file.filename);
      return res.status(400).json({
        success: false,
        message: `NIM ${cleanNim} sudah digunakan oleh anggota lain.`,
      });
    }

    let foto_path = currentMember.foto_path;
    if (req.file) {
      // User mengupload foto baru: ganti nama file foto dan hapus file foto lama
      foto_path = req.file.filename;
      removeFileIfExists(currentMember.foto_path);
    }

    const updateQuery = `
      UPDATE members 
      SET nama = ?, nim = ?, role = ?, kontribusi = ?, foto_path = ?
      WHERE id = ?
    `;
    await pool.query(updateQuery, [
      nama.trim(),
      cleanNim,
      role.trim(),
      kontribusi.trim(),
      foto_path,
      id,
    ]);

    const [updatedRows] = await pool.query('SELECT * FROM members WHERE id = ?', [id]);

    return res.status(200).json({
      success: true,
      message: 'Data anggota berhasil diperbarui.',
      data: formatMember(updatedRows[0], req),
    });
  } catch (error) {
    if (req.file) removeFileIfExists(req.file.filename);
    next(error);
  }
};

/**
 * DELETE /api/members/:id
 * Menghapus data anggota dan file fotonya dari server
 */
const deleteMember = async (req, res, next) => {
  try {
    const pool = getPool();
    const { id } = req.params;

    const [existingRows] = await pool.query('SELECT * FROM members WHERE id = ?', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Member dengan ID ${id} tidak ditemukan.`,
      });
    }

    const currentMember = existingRows[0];

    // Hapus dari database
    await pool.query('DELETE FROM members WHERE id = ?', [id]);

    // Hapus file foto dari disk
    removeFileIfExists(currentMember.foto_path);

    return res.status(200).json({
      success: true,
      message: `Member "${currentMember.nama}" berhasil dihapus.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
