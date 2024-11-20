import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./peliculasPage.css";

const peliculasData = [
    {
        id: 1,
        cover: "../images/upcome/u1.jpg",
        title: "My office Boss",
        description: "A hilarious comedy about a young man who finds himself working under a difficult boss.",
        rating: 4.5,
        time: "2hr : 38mins",
        price: 25 
      },
      {
        id: 2,
        cover: "../images/upcome/u2.jpg",
        title: "Shadowe",
        description: "A dark thriller with twists at every corner, where nothing is what it seems.",
        rating: 4.2,
        time: "2hr : 38mins",
        price: 28
      },
      {
        id: 3,
        cover: "../images/upcome/u3.jpg",
        title: "Another Danger",
        description: "An action-packed movie full of intense moments as a hero faces his greatest challenges.",
        rating: 4.8,
        time: "2hr : 38mins",
        price: 20
      },
      {
        id: 4,
        cover: "../images/upcome/u4.jpg",
        title: "One Man Army",
        description: "A story about a lone soldier on a mission to save the world from imminent danger.",
        rating: 4.7,
        time: "2hr : 38mins",
        price: 30
      },
      {
        id: 5,
        cover: "../images/upcome/u5.jpg",
        title: "Jumbo Queen",
        description: "A family adventure that blends humor and action as the Jumbo Queen embarks on a journey.",
        rating: 4.1,
        time: "2hr : 38mins",
        price: 15
      },
];

const PeliculasPage = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (pelicula) => {
    addToCart(pelicula);
  };

  return (
    <div className="peliculasPage">
      <h1>Películas</h1>
      <div className="peliculasList">
        {peliculasData.map((pelicula) => (
          <div key={pelicula.id} className="box">
            <div className="coverImage">
              <img src={pelicula.cover} alt={pelicula.title} />
            </div>
            <div className="content flex">
              <div className="details row">
                <h1>{pelicula.title}</h1>
                <div className="rating flex">
                  <label> Time :{pelicula.time}</label>
                </div>
                <p>{pelicula.description}</p>
                <p>Rating: {pelicula.rating}</p> 
                <p>Price: ${pelicula.price}</p>  
                <button
                  className="primary-btn"
                  onClick={() => handleAddToCart(pelicula)}
                >
                  <i></i> COMPRAR AHORA
                </button>
              </div>
              <div className="palyButton row">
                <Link to={`/singlepage/${pelicula.id}`}>
                  <button>
                    <div className="img">
                      <img src="./images/play-button.png" alt="" />
                      <img src="./images/play.png" className="change" />
                    </div>
                    Mirar Trailer
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeliculasPage;
