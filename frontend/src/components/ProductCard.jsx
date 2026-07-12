import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <img
        className="product-image"
        src={
          product.image
            ? `http://localhost:5000/uploads/${product.image}`
            : "https://placehold.co/600x400?text=Product"
        }
        alt={product.title}
      />

      <div className="product-info">

        <h2 className="product-title">
          {product.title}
        </h2>

        <p className="product-price">
          ${product.price}
        </p>

        <p className="product-stock">
          Stock : {product.stock}
        </p>

        <Link
          className="details-btn"
          to={`/products/${product.id}`}
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;