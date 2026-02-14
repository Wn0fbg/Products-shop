import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const extractItems = (data) => {
  if (Array.isArray(data)) return data;

  // разные варианты обёртки
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.products)) return data.products;
  if (Array.isArray(data?.items)) return data.items;

  // возможное вложение в payload
  if (data?.payload) {
    if (Array.isArray(data.payload.products)) return data.payload.products;
    if (Array.isArray(data.payload.items)) return data.payload.items;
    if (Array.isArray(data.payload.data)) return data.payload.data;
  }

  // ещё одна обёртка
  if (Array.isArray(data?.data?.data)) return data.data.data;
  return [];
};

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);

      const data = response?.data;
      console.log("fetchProducts response.data:", data);

      const items = extractItems(data);
      console.log("fetchProducts extracted items:", items);

      set({ products: items, error: null });
    } catch (err) {
      const status = err?.response?.status;
      if (status === 429) set({ error: "Rate limit exceeded" });
      else set({ error: "Something went wrong" });
      console.error("fetchProducts error", err);
    } finally {
      set({ loading: false });
    }
  },
}));
