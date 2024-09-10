import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  login: async () => {},
  signUp: async (credentials) => {
    try {
      set({ isSigningUp: true });
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully")
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
      set({ isSigningUp: false, user: null });
    }
  },
  logout: async () => {},
  authCheck: async () => {},
}));
