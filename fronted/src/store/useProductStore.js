import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  formData: {
    product_name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () =>
    set({ formData: { product_name: "", price: "", image: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`http://localhost:3000/products`, formData);
      await get().getProducts();
      await get().resetForm();
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

  getProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data,
        error: null,
      });
    } catch (err) {
      console.log("Error in get Product", err);
      set({ err: "Something went wrong", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const repsonse = await axios.put(
        `http://localhost:3000/products/${id}`,
        formData,
      );
      set({ currentProduct: repsonse.data.data });
      toast.success("Product updated");
    } catch (err) {
      console.log("Error in update product", err);
      toast.error("Error in update product", err);
    } finally {
      set({ loading: false });
    }
  },
}));
