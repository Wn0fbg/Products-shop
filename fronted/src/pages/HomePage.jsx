import { PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import Product from "../components/Product";
import { useProductStore } from "../store/useProductStore";
import AddProductModal from "../components/AddProductModal";

function HomePage() {
  const { getProducts } = useProductStore();
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("add_product_modal").showModal()
          }
        >
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>
        <button className="btn btn-ghost btn-circle">
          <RefreshCwIcon className="size-5" onClick={() => getProducts()} />
        </button>
      </div>

      <AddProductModal />

      <Product />
    </main>
  );
}

export default HomePage;
