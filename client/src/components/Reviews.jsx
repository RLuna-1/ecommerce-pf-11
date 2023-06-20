import React, { useState, useEffect } from "react";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const productId = "123"; // Reemplaza con el id del producto actual

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/reviews/${productId}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div className="opiniones">
      <div>
        {reviews.map((review) => (
          <div key={review.id}>
            <p>Rating: {review.rating}</p>
            <h3>{review.name}</h3>
            <p>{review.description}</p>
            <p>{review.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;

