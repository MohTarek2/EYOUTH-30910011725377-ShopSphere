import { useEffect, useState } from "react";
import { getMyOrders } from "../services/order.service";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data.orders);
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
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h3>No Orders Yet</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h2>Order #{order.id}</h2>

            <p>
              <strong>Total Price:</strong> ${order.totalPrice}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <p>
              <strong>Items:</strong>{" "}
              {order.items ? order.items.length : 0}
            </p>

            {order.items && order.items.length > 0 && (
              <div style={{ marginTop: "15px" }}>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: "10px",
                      borderTop: "1px solid #eee",
                    }}
                  >
                    <h4>{item.product.title}</h4>

                    <p>Quantity: {item.quantity}</p>

                    <p>Price: ${item.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;