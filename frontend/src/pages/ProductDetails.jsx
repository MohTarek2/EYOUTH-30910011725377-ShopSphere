import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../services/product.service";
import { addToCart } from "../services/cart.service";
import { getReviews, addReview } from "../services/review.service";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    reviewerName: "",
    rating: 5,
    comment: "",
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    loadProduct();
    loadReviews();
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

  const loadReviews = async () => {
    try {
      const data = await getReviews(id);
      setReviews(data.reviews || []);
    } catch (error) {
      console.error(error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewForm.reviewerName || !reviewForm.comment) {
      alert("Please fill in your name and comment");
      return;
    }

    setSubmittingReview(true);
    try {
      await addReview({
        productId: id,
        reviewerName: reviewForm.reviewerName,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
      });
      setReviewForm({ reviewerName: "", rating: 5, comment: "" });
      await loadReviews();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
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
    <div>
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

      <div style={{ marginTop: "40px" }}>
        <h2>Reviews</h2>

        {reviewsLoading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review this product.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px 0",
              }}
            >
              <b>{review.reviewerName}</b> — {"★".repeat(review.rating)}
              <p>{review.comment}</p>
            </div>
          ))
        )}

        <form onSubmit={handleReviewSubmit} style={{ marginTop: "20px" }}>
          <h3>Add a Review</h3>

          <input
            type="text"
            name="reviewerName"
            placeholder="Your name"
            value={reviewForm.reviewerName}
            onChange={handleReviewChange}
            style={{ display: "block", marginBottom: "10px", padding: "8px", width: "300px" }}
          />

          <select
            name="rating"
            value={reviewForm.rating}
            onChange={handleReviewChange}
            style={{ display: "block", marginBottom: "10px", padding: "8px" }}
          >
            <option value={5}>5 - Excellent</option>
            <option value={4}>4 - Good</option>
            <option value={3}>3 - Average</option>
            <option value={2}>2 - Poor</option>
            <option value={1}>1 - Bad</option>
          </select>

          <textarea
            name="comment"
            placeholder="Your comment"
            value={reviewForm.comment}
            onChange={handleReviewChange}
            style={{ display: "block", marginBottom: "10px", padding: "8px", width: "300px" }}
          />

          <button type="submit" disabled={submittingReview} style={{ padding: "10px 16px", cursor: "pointer" }}>
            {submittingReview ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductDetails;