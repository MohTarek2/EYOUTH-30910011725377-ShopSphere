import { useEffect, useState } from "react";
import {
  getCart,
  removeCartItem,
} from "../services/cart.service";
import { createOrder } from "../services/order.service";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data.cart);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeCartItem(id);
      loadCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      await createOrder();

      alert("Order created successfully");

      navigate("/orders");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Checkout failed"
      );
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!cart || cart.items.length === 0) {
    return <h2>Your cart is empty.</h2>;
  }

  return (
    <div>
      <h1>Shopping Cart</h1>

      {cart.items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h3>{item.product.title}</h3>

          <p>Price: ${item.product.price}</p>

          <p>Quantity: {item.quantity}</p>

          <button onClick={() => handleRemove(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <hr />

      <button
        onClick={handleCheckout}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Checkout
      </button>
    </div>
  );
}

export default Cart;