import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
});

// Response interceptor untuk menyeragamkan error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'Terjadi kesalahan pada server.';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Tidak dapat terhubung ke server backend (port 5000). Pastikan backend aktif!';
      } else {
        errorMessage = error.message;
      }
    }
    return Promise.reject(new Error(errorMessage));
  }
);

export const getMembers = async () => {
  const response = await api.get('/members');
  return response.data;
};

export const getMemberById = async (id) => {
  const response = await api.get(`/members/${id}`);
  return response.data;
};

export const createMember = async (formData) => {
  const response = await api.post('/members', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateMember = async (id, formData) => {
  const response = await api.put(`/members/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteMember = async (id) => {
  const response = await api.delete(`/members/${id}`);
  return response.data;
};

export default api;
