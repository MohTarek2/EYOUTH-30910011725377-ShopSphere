import { Link } from "react-router-dom";
import "./../styles/Navbar.css";

function Navbar() {

  const token = localStorage.getItem("token");

  return (

    <nav className="navbar">

      <Link className="logo" to="/">
        E-Shop
      </Link>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        {token && <Link to="/cart">Cart</Link>}

        {token && <Link to="/orders">Orders</Link>}

        {token && <Link to="/dashboard">Dashboard</Link>}

        {!token && <Link to="/login">Login</Link>}

        {!token && <Link to="/register">Register</Link>}

        {token && (
          <button
            className="logout-btn"
            onClick={()=>{
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}

      </div>

    </nav>

  );

}

export default Navbar;