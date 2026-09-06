-- Database: Kelompok Mie Ayam
-- Purpose: Store member information with photo management
-- Created: 2026-09-07

-- Drop database jika sudah ada (optional)
DROP DATABASE IF EXISTS kelompok_mie_ayam;

-- Create database
CREATE DATABASE kelompok_mie_ayam CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use database
USE kelompok_mie_ayam;

-- Create table: members
CREATE TABLE members (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Table untuk menyimpan data anggota kelompok Mie Ayam';

-- Insert sample data (optional - untuk testing)
INSERT INTO members (nama, nim, role, kontribusi, foto_path) VALUES
('Zain Kautsar Ridha', '247006111153', 'Backend Developer', 'Mengkonfigurasi Proxmox VE dan setup SSH access', 'default-avatar.png'),
('M. Nazril Putra R.', '247006111152', 'Infrastructure Engineer', 'Konfigurasi Linux Debian dan networking bridge', 'default-avatar.png'),
('Kamila Zahra R.', '247006111151', 'DevOps Engineer', 'Deploy Nginx dan implementasi reverse tunneling', 'default-avatar.png'),
('Chintia Aurizki P.', '247006111155', 'System Administrator', 'Alokasi resources dan validasi hypervisor', 'default-avatar.png'),
('M. Fasha Ajvikri', '247006111150', 'Documentation Lead', 'Dokumentasi project dan testing', 'default-avatar.png');

-- Verify table structure
DESCRIBE members;

-- Show sample data
SELECT * FROM members;
