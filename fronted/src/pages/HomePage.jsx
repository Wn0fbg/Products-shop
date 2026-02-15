import { PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import Product from "../components/Product";

function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button className="btn btn-primary">
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>
        <button className="btn btn-ghost btn-circle">
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      <Product />
    </main>
  );
}

export default HomePage;
