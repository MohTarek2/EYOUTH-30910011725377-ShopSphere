import reviewApi from "../utils/reviewAxiosInstance";

export const getReviews = async (productId) => {
  const response = await reviewApi.get(`/api/reviews/${productId}`);
  return response.data;
};

export const addReview = async (reviewData) => {
  const response = await reviewApi.post("/api/reviews", reviewData);
  return response.data;
};