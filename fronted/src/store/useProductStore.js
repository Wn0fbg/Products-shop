import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  formData: {
    product_name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { product_name: "", price: "", image: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`http://localhost:3000/products`, formData);
      await get().getProducts();
      toast.success("Product added");
    } catch (err) {
      console.log("Error in function add product", err);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  getProducts: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get("http://localhost:3000/products");
      set({ products: res.data });
    } catch (err) {
      console.error(err.message);
      set({ error: "Failed to fetch todos. Please try again later" });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted");
    } catch (err) {
      console.error(err.message);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
