import React, { useEffect, useState } from "react";
import axios from "axios";

const Wishlist = ({ id }) => {
  const [wishlist, setWishlist] = useState(null);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`/wishlist/${id}`);
      setWishlist(response.data.wishlist);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [id]);

  const removeProduct = async (productId) => {
    try {
      await axios.delete(`/wishlist/${id}/products/${productId}`);
      fetchWishlist();
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  return (
    <div>
      <h2>Wishlist</h2>
      {wishlist === null ? (
        <p>Loading...</p>
      ) : wishlist.products.length === 0 ? (
        <p>No products in the wishlist</p>
      ) : (
        <ul>
          {wishlist.products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button onClick={() => removeProduct(product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
