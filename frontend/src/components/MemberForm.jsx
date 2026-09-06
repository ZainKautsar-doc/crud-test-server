import React, { useState, useEffect, useRef } from 'react';
import { Upload, X, AlertCircle, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';

const MemberForm = ({ initialData, mode, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nama: '',
    nim: '',
    role: '',
    kontribusi: '',
  });

  const [fotoFile, setFotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nama: initialData.nama || '',
        nim: initialData.nim || '',
        role: initialData.role || '',
        kontribusi: initialData.kontribusi || '',
      });
      if (initialData.foto_url) {
        setPreviewUrl(initialData.foto_url);
      }
    } else {
      setFormData({
        nama: '',
        nim: '',
        role: '',
        kontribusi: '',
      });
      setPreviewUrl('');
      setFotoFile(null);
    }
    setErrors({});
  }, [initialData]);

  // Client-side Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama lengkap wajib diisi.';
    }

    if (!formData.nim.trim()) {
      newErrors.nim = 'NIM wajib diisi.';
    } else if (!/^\d+$/.test(formData.nim.trim())) {
      newErrors.nim = 'NIM hanya boleh berisi angka (tidak boleh ada huruf atau karakter lain).';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role anggota wajib diisi.';
    }

    if (!formData.kontribusi.trim()) {
      newErrors.kontribusi = 'Deskripsi kontribusi wajib diisi.';
    }

    // Photo validation if a new file is chosen
    if (fotoFile) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(fotoFile.type)) {
        newErrors.foto = 'Format file foto harus JPG, JPEG, PNG, atau WEBP.';
      } else if (fotoFile.size > 5 * 1024 * 1024) {
        newErrors.foto = 'Ukuran file foto melebihi batas maksimal 5MB.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size immediately
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, foto: 'Ukuran foto maksimal 5MB.' }));
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, foto: 'Format foto harus berupa JPG, PNG, atau WEBP.' }));
      return;
    }

    setFotoFile(file);
    setErrors((prev) => ({ ...prev, foto: null }));

    // Generate local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setFotoFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    data.append('nama', formData.nama.trim());
    data.append('nim', formData.nim.trim());
    data.append('role', formData.role.trim());
    data.append('kontribusi', formData.kontribusi.trim());

    if (fotoFile) {
      data.append('foto', fotoFile);
    }

    onSubmit(data);
  };

  const isDetail = mode === 'detail';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Nama Field */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-[#1F2937] mb-1.5">
          Nama Lengkap <span className="text-[#DC2626]">*</span>
        </label>
        <input
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleInputChange}
          disabled={isDetail || loading}
          placeholder="contoh: Zain Kautsar Ridha"
          className={`w-full p-3 font-semibold text-sm neo-input ${
            errors.nama ? 'border-[#DC2626] focus:border-[#DC2626]' : ''
          } ${isDetail ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
        {errors.nama && (
          <p className="mt-1.5 text-xs font-bold text-[#DC2626] flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.nama}
          </p>
        )}
      </div>

      {/* NIM Field */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-[#1F2937] mb-1.5">
          NIM (Nomor Induk Mahasiswa - Hanya Angka) <span className="text-[#DC2626]">*</span>
        </label>
        <input
          type="text"
          name="nim"
          value={formData.nim}
          onChange={handleInputChange}
          disabled={isDetail || loading}
          placeholder="contoh: 247006111153"
          className={`w-full p-3 font-mono font-semibold text-sm neo-input ${
            errors.nim ? 'border-[#DC2626] focus:border-[#DC2626]' : ''
          } ${isDetail ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
        {errors.nim && (
          <p className="mt-1.5 text-xs font-bold text-[#DC2626] flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.nim}
          </p>
        )}
      </div>

      {/* Role Field */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-[#1F2937] mb-1.5">
          Role / Posisi di Kelompok <span className="text-[#DC2626]">*</span>
        </label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          disabled={isDetail || loading}
          placeholder="contoh: Backend Developer / DevOps Engineer"
          className={`w-full p-3 font-semibold text-sm neo-input ${
            errors.role ? 'border-[#DC2626] focus:border-[#DC2626]' : ''
          } ${isDetail ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
        {errors.role && (
          <p className="mt-1.5 text-xs font-bold text-[#DC2626] flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.role}
          </p>
        )}
      </div>

      {/* Kontribusi Field */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-[#1F2937] mb-1.5">
          Deskripsi Kontribusi <span className="text-[#DC2626]">*</span>
        </label>
        <textarea
          name="kontribusi"
          rows={3}
          value={formData.kontribusi}
          onChange={handleInputChange}
          disabled={isDetail || loading}
          placeholder="Jelaskan kontribusi teknis anggota dalam project ini..."
          className={`w-full p-3 font-semibold text-sm neo-input resize-none ${
            errors.kontribusi ? 'border-[#DC2626] focus:border-[#DC2626]' : ''
          } ${isDetail ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
        {errors.kontribusi && (
          <p className="mt-1.5 text-xs font-bold text-[#DC2626] flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.kontribusi}
          </p>
        )}
      </div>

      {/* Photo Upload & Preview */}
      {!isDetail && (
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-[#1F2937] mb-1.5">
            Foto Profil {mode === 'create' ? '(Opsional - Maksimal 5MB)' : '(Ganti Foto - Opsional)'}
          </label>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 bg-gray-50 border-2 border-[#1F2937]">
            {/* Thumbnail Preview */}
            <div className="w-20 h-20 bg-white border-2 border-[#1F2937] flex-shrink-0 flex items-center justify-center overflow-hidden relative">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-400" />
              )}
            </div>

            {/* Upload Button Controls */}
            <div className="flex-1 space-y-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                disabled={loading}
                className="hidden"
                id="foto-upload-input"
              />
              <div className="flex flex-wrap gap-2">
                <label
                  htmlFor="foto-upload-input"
                  className="px-3 py-2 bg-[#1B5E8F] text-white font-bold text-xs uppercase cursor-pointer border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] hover:bg-[#13456B] active:translate-y-0.5 inline-flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Pilih File Foto
                </label>
                {fotoFile && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="px-2.5 py-1.5 bg-gray-200 text-[#1F2937] font-bold text-xs uppercase border border-[#1F2937] hover:bg-gray-300"
                  >
                    Batal Pilih
                  </button>
                )}
              </div>
              <p className="text-[11px] font-medium text-gray-600">
                {fotoFile ? `File: ${fotoFile.name} (${(fotoFile.size / 1024 / 1024).toFixed(2)} MB)` : 'Mendukung: JPG, PNG, WEBP (Max: 5MB)'}
              </p>
            </div>
          </div>

          {errors.foto && (
            <p className="mt-1.5 text-xs font-bold text-[#DC2626] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.foto}
            </p>
          )}
        </div>
      )}

      {/* Detail Mode Photo display */}
      {isDetail && previewUrl && (
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-[#1F2937] mb-1.5">
            Foto Profil
          </label>
          <div className="w-24 h-24 border-2 border-[#1F2937] shadow-[3px_3px_0px_0px_#1F2937] overflow-hidden">
            <img src={previewUrl} alt={formData.nama} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="pt-4 border-t-2 border-[#1F2937] flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2.5 bg-white text-[#1F2937] border-2 border-[#1F2937] shadow-[3px_3px_0px_0px_#1F2937] font-black text-xs uppercase hover:bg-gray-100 active:translate-y-0.5"
        >
          {isDetail ? 'Tutup' : 'Batal'}
        </button>

        {!isDetail && (
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-[#FDB913] text-[#1F2937] border-2 border-[#1F2937] shadow-[4px_4px_0px_0px_#1F2937] font-black text-xs uppercase hover:bg-[#F59E0B] active:translate-y-0.5 flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === 'create' ? 'Simpan Anggota' : 'Perbarui Data'}
          </button>
        )}
      </div>

    </form>
  );
};

export default MemberForm;
