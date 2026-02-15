import { useState } from "react";
import { Link } from "react-router-dom";
import { EditIcon, Trash2Icon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const deletedProducts = async (id) => {
    console.log("deletedProduct", id);
    try {
      setError(null);
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter((product) => product.product_id !== id));
      toast.success("Product deleted");
    } catch (err) {
      console.error(err.message);
      setError("Failed to delete todo. Please try again");
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="card bg-base-100 m-5 shadow-xl hover:shadow-2xl transition-duration duration-300">
      <figure className="relative pt-[56.25%]">
        <img
          src={product.image}
          alt={product.product_name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">
          {product.product_name}
        </h2>
        <p className="text-2xl font-bold text-primary">
          ${Number(product.price).toFixed()}
        </p>

        <div className="card-actions justify-end mt-4">
          <Link
            to={`/product/${product.product_id}`}
            className="btn btn-sm btn-info btn-outline"
          >
            <EditIcon className="size-4" />
          </Link>

          <button
            className="btn btn-sm btn-error btn-outline"
            onClick={() => deletedProducts(product.product_id)}
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
