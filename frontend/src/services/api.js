import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = () => api.get('/products');
export const placeOrder = (orderData) => api.post('/orders', orderData);
export const getOrder = (id) => api.get(`/orders/${id}`);
export const getAdminOrders = () => api.get('/admin/orders');
export const updateOrderStatus = (id, status) => api.put(`/admin/orders/${id}`, { status });
