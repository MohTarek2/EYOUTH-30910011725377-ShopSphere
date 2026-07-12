import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../services/product.service";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Products</h1>

      {products.length === 0 ? (
        <p>No Products Found.</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h2>{product.title}</h2>

            <p>{product.description}</p>

            <h3>${product.price}</h3>

            <p>Stock: {product.stock}</p>

            <Link to={`/products/${product.id}`}>
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Products;