import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../services/product.service";
import { addToCart } from "../services/cart.service";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data.product);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1);
      alert("Product added to cart");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (!product) return <h2>Product not found</h2>;

  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        alignItems: "center",
      }}
    >
      <img
        src={
          product.image
            ? `http://localhost:5000/uploads/${product.image}`
            : "https://placehold.co/500x400?text=Product"
        }
        alt={product.title}
        style={{
          width: "400px",
          borderRadius: "10px",
        }}
      />

      <div>
        <h1>{product.title}</h1>

        <h2 style={{ color: "green" }}>
          ${product.price}
        </h2>

        <p>{product.description}</p>

        <p>
          <b>Stock:</b> {product.stock}
        </p>

        <button
          onClick={handleAddToCart}
          style={{
            padding: "12px 20px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;