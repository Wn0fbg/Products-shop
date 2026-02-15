import { create } from "zustand";
import { Axis3D } from "lucide-react";
import axios from "axios";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post("http://localhost:3000/products", formData);
      await get().fet
    } catch (error) {
    } finally {
      set({ loading: false });
    }
  },
}));
