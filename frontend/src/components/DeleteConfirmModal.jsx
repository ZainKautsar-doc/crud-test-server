import React, { useState } from 'react';
import { useMembers } from '../context/MemberContext';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

const DeleteConfirmModal = () => {
  const { deleteDialog, closeDeleteDialog, removeMember } = useMembers();
  const [deleting, setDeleting] = useState(false);

  if (!deleteDialog.isOpen || !deleteDialog.member) return null;

  const { member } = deleteDialog;

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await removeMember(member.id);
    } catch (err) {
      // Error handled in context toast
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-md bg-white border-4 border-[#1F2937] shadow-[10px_10px_0px_0px_#1F2937] animate-in fade-in zoom-in-95 duration-150"
        role="alertdialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#DC2626] text-white border-b-3 border-[#1F2937]">
          <div className="flex items-center gap-2 font-black uppercase text-base tracking-wider">
            <AlertTriangle className="w-5 h-5 text-yellow-300" />
            <h3>Konfirmasi Hapus Data</h3>
          </div>
          <button
            onClick={closeDeleteDialog}
            className="p-1 bg-white text-[#1F2937] border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] hover:bg-gray-100"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-base text-gray-800 leading-relaxed font-semibold">
            Apakah Anda yakin ingin menghapus anggota{' '}
            <span className="font-black text-[#1F2937] bg-[#FEF3C7] px-1.5 py-0.5 border border-[#1F2937]">
              {member.nama}
            </span>{' '}
            (NIM: {member.nim})?
          </p>

          <div className="p-3 bg-red-50 border-2 border-dashed border-[#DC2626] text-xs font-semibold text-[#DC2626]">
            ⚠️ Tindakan ini permanen. Data anggota dan file foto profil terkait pada server akan dihapus secara fisik.
          </div>
        </div>

        {/* Buttons */}
        <div className="p-4 bg-gray-50 border-t-2 border-[#1F2937] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeDeleteDialog}
            disabled={deleting}
            className="px-4 py-2 bg-white text-[#1F2937] border-2 border-[#1F2937] shadow-[3px_3px_0px_0px_#1F2937] font-black text-xs uppercase hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            disabled={deleting}
            className="px-5 py-2 bg-[#DC2626] text-white border-2 border-[#1F2937] shadow-[4px_4px_0px_0px_#1F2937] font-black text-xs uppercase hover:bg-[#B91C1C] active:translate-y-0.5 flex items-center gap-2"
          >
            {deleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Hapus Member
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmModal;
