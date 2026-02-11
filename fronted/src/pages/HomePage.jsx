import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/useProductStore";

function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products);

  return <ProductCard/>;
}

export default HomePage;
