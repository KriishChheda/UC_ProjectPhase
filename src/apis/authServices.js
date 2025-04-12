import API from "../api";

// Helper function to handle localStorage
const storeAuthData = (access, refresh, user) => {
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
  localStorage.setItem('user', JSON.stringify(user));
};

export const registerUser = async (name, email, password, role) => {
    const payload = {
      name,
      email,
      password,
      confirm_password: password,
      role,
    };
  
    try {
      console.log("Register Payload:", payload); // ✅ Now we're logging a defined object
      const response = await API.post('/auth/register/', payload);
  
      // If registration is successful, proceed to login
      return loginUser(email, password);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };
  

export const loginUser = async (email, password) => {
  try {
    const response = await API.post('/auth/login/', {
      email,
      password,
    });

    const { access, refresh, user } = response.data;
    storeAuthData(access, refresh, user);
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refreshToken');
    
    if (!refresh) {
      throw new Error('No refresh token available');
    }
    
    const response = await API.post('/auth/token/refresh/', { refresh });
    const { access } = response.data;
    
    localStorage.setItem('accessToken', access);
    return access;
  } catch (error) {
    console.error('Token refresh error:', error);
    // If refresh fails, clear auth data and force re-login
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};