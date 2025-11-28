import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'http://localhost:3001/webhook';

const api = axios.create({
    baseURL: API_URL
});

// Events API
export const eventsAPI = {
    getAll: () => api.get('/events'),
    getById: (id) => api.get(`/events/${id}`),
    create: (data) => api.post('/events', data),
    update: (id, data) => api.put(`/events/${id}`, data),
    uploadDocument: (id, file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post(`/events/${id}/documents`, formData);
    },
    uploadIndoorMap: (id, file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post(`/events/${id}/indoor-map`, formData);
    },
    updatePOIs: (id, pois) => api.put(`/events/${id}/pois`, { pois })
};

// Registrations API
export const registrationsAPI = {
    getAll: (eventId) => api.get('/registrations', { params: { eventId } }),
    create: (data) => api.post('/registrations', data),
    verifyPayment: (data) => api.post('/registrations/verify-payment', data)
};

// Tickets API
export const ticketsAPI = {
    getAll: (eventId, status) => api.get('/tickets', { params: { eventId, status } }),
    reply: (id, replyText) => api.post(`/tickets/${id}/reply`, { replyText }),
    updateStatus: (id, status) => api.put(`/tickets/${id}/status`, { status })
};

// Webhook API
export const webhooksAPI = {
    sendPoll: (chatId, question, options) =>
        axios.post(`${WEBHOOK_URL}/poll`, { chatId, question, options })
};

export default api;
