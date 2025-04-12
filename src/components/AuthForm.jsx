import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../apis/authServices';
import useAuthStore from '../store/authStore';

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [userType, setUserType] = useState('hire');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { login, isAuthenticated, user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      navigate(user.role === 'worker' ? '/worker-homepage' : '/customer-homepage');
    }
  }, [loading, isAuthenticated, user, navigate]);
  

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      redirectBasedOnRole(user.role);
    }
  }, [isAuthenticated, loading, user]);

  const redirectBasedOnRole = (role) => {
    navigate(role === 'worker' ? '/worker-homepage' : '/customer-homepage');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';

    if (!isSignIn) {
      if (!form.name) newErrors.name = 'Name is required';
      if (form.password !== form.confirm) newErrors.confirm = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      let response;
      if (isSignIn) {
        response = await loginUser(form.email, form.password);
      } else {
        const role = userType === 'hire' ? 'customer' : 'worker';
        response = await registerUser(form.name, form.email, form.password, role);
      }
  
      login(response); // ✅ Zustand update
  
    } catch (err) {
      console.error('Authentication error:', err);
      setErrors({
        submit: err.response?.data?.message || 'Authentication failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen md:px-44 bg-gradient-to-r from-[#220440] via-[#4F1E4F] to-[#7B375D]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <img src="./image10.png" alt="Characters illustration" className="max-w-full max-h-full" />
          </div>

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-center mb-8">{isSignIn ? 'LOGIN TO CONTINUE' : 'SIGN UP TO CONTINUE'}</h2>

            <div className="flex mb-6">
              <button className={`flex-1 py-2 px-4 rounded-l-[17px] ${!isSignIn ? 'bg-[#220440] text-white' : 'bg-[#79698899] text-white'}`} onClick={() => setIsSignIn(false)}>Sign up</button>
              <button className={`flex-1 py-2 px-4 rounded-r-[17px] ${isSignIn ? 'bg-[#220440] text-white' : 'bg-[#79698899] text-white'}`} onClick={() => setIsSignIn(true)}>Sign in</button>
            </div>

            {errors.submit && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">{errors.submit}</div>
            )}

            <div className="space-y-4 mb-6">
              {!isSignIn && (
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name"
                  className={`w-full px-4 py-2 bg-gray-100 rounded-[17px] ${errors.name ? 'border border-red-500' : ''}`} />
              )}
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email"
                className={`w-full px-4 py-2 bg-gray-100 rounded-[17px] ${errors.email ? 'border border-red-500' : ''}`} />
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password"
                className={`w-full px-4 py-2 bg-gray-100 rounded-[17px] ${errors.password ? 'border border-red-500' : ''}`} />
              {!isSignIn && (
                <input type="password" name="confirm" value={form.confirm} onChange={handleChange} placeholder="Confirm Password"
                  className={`w-full px-4 py-2 bg-gray-100 rounded-[17px] ${errors.confirm ? 'border border-red-500' : ''}`} />
              )}

              {isSignIn && <div className="text-right"><a href="#" className="text-sm text-blue-600">Forgot Password?</a></div>}

              {!isSignIn && (
                <div className="flex space-x-6 mt-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="userType" checked={userType === 'hire'} onChange={() => setUserType('hire')} className="form-radio h-4 w-4 text-[#220440]" />
                    <span>Hire</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="userType" checked={userType === 'work'} onChange={() => setUserType('work')} className="form-radio h-4 w-4 text-[#220440]" />
                    <span>Work</span>
                  </label>
                </div>
              )}
            </div>

            <button onClick={handleSubmit} disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-[#220440] text-white rounded-[17px] ${isSubmitting ? 'opacity-70' : ''}`}>
              {isSubmitting ? 'Processing...' : isSignIn ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
