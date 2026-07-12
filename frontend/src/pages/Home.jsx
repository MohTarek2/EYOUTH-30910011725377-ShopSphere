import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "80px",
      }}
    >
      <h1 style={{ fontSize: "48px" }}>
        Welcome to E-Shop
      </h1>

      <p
        style={{
          fontSize: "20px",
          margin: "20px 0",
        }}
      >
        Buy the best products with the best prices.
      </p>

      <Link
        to="/products"
        style={{
          background: "#2563eb",
          color: "#fff",
          padding: "15px 30px",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "18px",
        }}
      >
        Shop Now
      </Link>
    </div>
  );
}

export default Home;