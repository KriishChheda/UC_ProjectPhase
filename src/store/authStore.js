import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isWorker: false,
  isCustomer: false,
  loading: true,

  login: (userData) => {
    const isWorker = userData?.role === 'worker';
    const isCustomer = userData?.role === 'customer';

    localStorage.setItem('user', JSON.stringify(userData));
    set({
      user: userData,
      isAuthenticated: true,
      isWorker,
      isCustomer,
      loading: false,
    });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  
    set({
      user: null,
      isAuthenticated: false,
      isWorker: false,
      isCustomer: false,
      loading: false,
    });
  },  

  updateUserProfile: (updatedData) =>
    set((state) => {
      const updatedUser = { ...state.user, ...updatedData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { user: updatedUser };
    }),

  loadUser: () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const isWorker = user?.role === 'worker';
      const isCustomer = user?.role === 'customer';

      set({
        user,
        isAuthenticated: true,
        isWorker,
        isCustomer,
        loading: false,
      });
    } else {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
