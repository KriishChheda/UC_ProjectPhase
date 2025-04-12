import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import useAuthStore from './store/authStore.js';

const ContextProvider = ({ children }) => {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return children;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </ContextProvider>
  </StrictMode>,
)