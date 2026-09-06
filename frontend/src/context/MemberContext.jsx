import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as memberApi from '../utils/api';

const MemberContext = createContext();

export const MemberProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Toast Notification System
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Modal State (Create, Edit, Detail)
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'create', // 'create' | 'edit' | 'detail'
    member: null,
  });

  const openModal = (mode = 'create', member = null) => {
    setModalState({
      isOpen: true,
      mode,
      member,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: 'create',
      member: null,
    });
  };

  // Delete Confirmation Dialog State
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    member: null,
  });

  const openDeleteDialog = (member) => {
    setDeleteDialog({
      isOpen: true,
      member,
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      isOpen: false,
      member: null,
    });
  };

  // Fetch Members
  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await memberApi.getMembers();
      if (res.success) {
        setMembers(res.data);
      }
    } catch (err) {
      setError(err.message);
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Initial load
  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // Create Member
  const addMember = async (formData) => {
    try {
      const res = await memberApi.createMember(formData);
      if (res.success) {
        showToast(res.message || 'Anggota baru berhasil ditambahkan!', 'success');
        await fetchMembers();
        closeModal();
        return true;
      }
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  // Edit Member
  const editMember = async (id, formData) => {
    try {
      const res = await memberApi.updateMember(id, formData);
      if (res.success) {
        showToast(res.message || 'Data anggota berhasil diperbarui!', 'success');
        await fetchMembers();
        closeModal();
        return true;
      }
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  // Remove Member
  const removeMember = async (id) => {
    try {
      const res = await memberApi.deleteMember(id);
      if (res.success) {
        showToast(res.message || 'Anggota berhasil dihapus!', 'success');
        await fetchMembers();
        closeDeleteDialog();
        return true;
      }
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  return (
    <MemberContext.Provider
      value={{
        members,
        loading,
        error,
        toasts,
        modalState,
        deleteDialog,
        showToast,
        dismissToast,
        openModal,
        closeModal,
        openDeleteDialog,
        closeDeleteDialog,
        fetchMembers,
        addMember,
        editMember,
        removeMember,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export const useMembers = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMembers must be used within a MemberProvider');
  }
  return context;
};
