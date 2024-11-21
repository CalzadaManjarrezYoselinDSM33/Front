import React from "react";
import { useCart } from "../context/CartContext";

const Ucard = ({ item: { id, cover, title, description, rating, price, image } }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const movie = { id, cover, title, description, rating, price, image };
    addToCart(movie);
  };

  const imageSrc = image ? `http://localhost:5000${image}` : cover;

  return (
    <div className="MovieBox">
      <div className="img">
        <img src={imageSrc} alt={title} />
      </div>
      <div className="movie-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Rating: {rating}</p>
        <p>Price: ${price}</p>
      </div>
      <button className="primary-btn" onClick={handleAddToCart}>
        <i></i> COMPRAR AHORA
      </button>
    </div>
  );
};

export default Ucard;
