import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth headers if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const todoAPI = {
  // Get all todos
  getTodos: () => api.get('/api/todos'),

  // Get a single todo
  getTodo: (id) => api.get(`/api/todos/${id}`),

  // Create a new todo
  createTodo: (todoData) => api.post('/api/todos', todoData),

  // Update a todo
  updateTodo: (id, updateData) => api.put(`/api/todos/${id}`, updateData),

  // Delete a todo
  deleteTodo: (id) => api.delete(`/api/todos/${id}`),
};

export default api;
