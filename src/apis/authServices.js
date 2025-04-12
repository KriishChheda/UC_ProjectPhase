import API from "../api";

export const registerUser = async (name, email, password, role) => {
    const response = await API.post('/auth/register/', {
      name,
      email,
      password,
      confirm_password: password,
      role,
    });
  
    return loginUser(email, password); // Auto-login after successful registration
  };
  
  export const loginUser = async (email, password) => {
    const response = await API.post('/auth/login/', {
      email,
      password,
    });
  
    const { access, refresh, user } = response.data;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    localStorage.setItem('user', JSON.stringify(user));
  
    return user;
  };
  
  export const refreshToken = async () => {
    const refresh = localStorage.getItem('refreshToken');
    const response = await API.post('/auth/token/refresh/', { refresh });
    const { access } = response.data;
    localStorage.setItem('accessToken', access);
    return access;
  };