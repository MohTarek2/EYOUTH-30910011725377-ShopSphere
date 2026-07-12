function Dashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            width: "200px",
            borderRadius: "10px",
          }}
        >
          <h2>Products</h2>
          <p>Manage Products</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            width: "200px",
            borderRadius: "10px",
          }}
        >
          <h2>Orders</h2>
          <p>View Orders</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            width: "200px",
            borderRadius: "10px",
          }}
        >
          <h2>Users</h2>
          <p>Manage Users</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;