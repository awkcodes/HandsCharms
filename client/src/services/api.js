import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = () => api.get('/products');

export const sellerAPI = {
  getOrders: () => api.get('/seller/orders'),
  getProducts: () => api.get('/seller/products'),
  updateProduct: (id, data) => api.put(`/seller/products/${id}`, data),
  createProduct: (data) => api.post('/seller/products', data)
};

export default api;