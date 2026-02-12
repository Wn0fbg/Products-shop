import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      const data = response?.data?.data;
      // Гарантируем, что products будет массивом
      set({ products: Array.isArray(data) ? data : [], error: null });
    } catch (err) {
      const status = err?.response?.status;
      if (status === 429) {
        set({ error: "Rate limit exceeded" });
      } else {
        set({ error: "Something went wrong" });
      }
    } finally {
      set({ loading: false });
    }
  },
}));