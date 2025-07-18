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

export const adminLogin = async (credentials) => {
  return await apiCall('/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const setAdminSession = (admin, token) => {
  localStorage.setItem('admin', JSON.stringify(admin));
  localStorage.setItem('admin_token', token);
  localStorage.setItem('isAdminLoggedIn', 'true');
}; 

// ADMIN CRUD
export const getAdmins = async () => {
  return await apiCall('/admin-management/admins', { method: 'GET', headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
};
export const createAdmin = async (adminData) => {
  return await apiCall('/admin-management/admins', { method: 'POST', body: JSON.stringify(adminData), headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
};
export const updateAdmin = async (admin_id, adminData) => {
  return await apiCall(`/admin-management/admins/${admin_id}`, { method: 'PUT', body: JSON.stringify(adminData), headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
};
export const getAdminInfo = async (admin_id) => {
  return await apiCall(`/admin-management/admins/${admin_id}`, { method: 'GET', headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
};
export const deleteAdmin = async (admin_id) => {
  return await apiCall(`/admin-management/admins/${admin_id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
};

// USER CRUD
export const getUsers = async () => {
  return await apiCall('/admin-management/users', { method: 'GET', headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
};
export const updateUserStatus = async (user_id, status) => {
  return await apiCall(`/admin-management/users/${user_id}/status`, { method: 'PATCH', body: JSON.stringify({ status }), headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
};
export const getUserInfo = async (user_id) => {
  return await apiCall(`/admin-management/users/${user_id}`, { method: 'GET', headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
};
export const deleteUser = async (user_id) => {
  return await apiCall(`/admin-management/users/${user_id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
}; 

// TEMPLATE CRUD
export const getTemplates = async () => {
  return await apiCall('/admin-management/templates', { 
    method: 'GET', 
    headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } 
  });
};

export const getTemplateById = async (template_id) => {
  return await apiCall(`/admin-management/templates/${template_id}`, { 
    method: 'GET', 
    headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } 
  });
};

export const createTemplate = async (templateData) => {
  return await apiCall('/admin-management/templates', { 
    method: 'POST', 
    body: JSON.stringify(templateData), 
    headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } 
  });
};

export const updateTemplate = async (template_id, templateData) => {
  return await apiCall(`/admin-management/templates/${template_id}`, { 
    method: 'PUT', 
    body: JSON.stringify(templateData), 
    headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } 
  });
};

export const deleteTemplate = async (template_id) => {
  return await apiCall(`/admin-management/templates/${template_id}`, { 
    method: 'DELETE', 
    headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } 
  });
}; 