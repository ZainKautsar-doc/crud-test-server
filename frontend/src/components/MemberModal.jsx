import React, { useState } from 'react';
import { useMembers } from '../context/MemberContext';
import MemberForm from './MemberForm';
import { X, UserPlus, Edit3, Eye } from 'lucide-react';

const MemberModal = () => {
  const { modalState, closeModal, addMember, editMember } = useMembers();
  const [submitting, setSubmitting] = useState(false);

  if (!modalState.isOpen) return null;

  const { mode, member } = modalState;

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (mode === 'create') {
        await addMember(formData);
      } else if (mode === 'edit' && member) {
        await editMember(member.id, formData);
      }
    } catch (err) {
      // Error is handled via toast in context
    } finally {
      setSubmitting(false);
    }
  };

  const getTitle = () => {
    if (mode === 'create') return 'Tambah Anggota Baru';
    if (mode === 'edit') return 'Edit Data Anggota';
    return 'Detail Informasi Anggota';
  };

  const getIcon = () => {
    if (mode === 'create') return <UserPlus className="w-5 h-5" />;
    if (mode === 'edit') return <Edit3 className="w-5 h-5" />;
    return <Eye className="w-5 h-5" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-xl bg-white border-4 border-[#1F2937] shadow-[10px_10px_0px_0px_#1F2937] max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-[#1B5E8F] text-white border-b-3 border-[#1F2937]">
          <div className="flex items-center gap-2.5 font-black uppercase text-base sm:text-lg tracking-wider">
            {getIcon()}
            <h2>{getTitle()}</h2>
          </div>
          <button
            onClick={closeModal}
            className="p-1 bg-[#FDB913] text-[#1F2937] border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] hover:bg-yellow-400 active:translate-y-0.5"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          <MemberForm
            initialData={member}
            mode={mode}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            loading={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
