const API_BASE_URL = 'http://localhost:4001/api';

// API call utility function
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    return {
      ok: response.ok,
      data,
      status: response.status,
    };
  } catch (error) {
    return {
      ok: false,
      data: { message: 'Network error. Please check your connection.' },
      status: 0,
    };
  }
};

// Session management utilities
export const setSession = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
  localStorage.setItem('isLoggedIn', 'true');
};

export const clearSession = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('isLoggedIn');
};

export const getSession = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  return {
    isLoggedIn,
    user: user ? JSON.parse(user) : null,
    token,
  };
};

export const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('token');
};

// API endpoints
export const loginUser = async (credentials) => {
  return await apiCall('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const registerUser = async (userData) => {
  return await apiCall('/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const getResumeInfo = async (userId) => {
  return await apiCall('/get-resume-info', {
    method: 'POST',
    body: JSON.stringify({ requested_user_id: userId }),
  });
};

export const submitResume = async (resumeData) => {
  return await apiCall('/resume', {
    method: 'POST',
    body: JSON.stringify(resumeData),
  });
};

export const logoutUser = () => {
  clearSession();
  window.location.reload();
}; 