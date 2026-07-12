import api from "../utils/axiosInstance";

export const createOrder = async () => {
  const response = await api.post("/orders");

  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);

  return response.data;
};