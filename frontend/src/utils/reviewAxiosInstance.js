import axios from "axios";

const reviewApi = axios.create({
  baseURL: import.meta.env.VITE_REVIEW_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default reviewApi;