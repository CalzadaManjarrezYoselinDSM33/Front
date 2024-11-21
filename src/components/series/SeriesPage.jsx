
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./seriesPage.css";

const seriesData = [
        {
            id: 1,
            title: "Sand Dust",
            rating: 4.7,
            time: "2hr : 22mins",
            description: "Sand and dust storms (SDS), also known as sirocco, haboob, yellow dust, white storms, and the harmattan, are a natural phenomenon linked with land and water management and climate change.",
            starring: "Karen Gilchrist, James Earl Jones",
            genres: "Action",
            tags: "Action, Adventures, Horror",
            cover: "../images/home1.jpg",
            video: "../video/video1.mp4",
            date: "20-Jan-1997",
            price: 25 
          },
          {
            id: 2,
            title: "skull island",
            rating: 4.6,
            time: "2hr : 22mins",
            description: "The island, like its inhabitants, is wholly fictional. Kong's island home in the Pacific makes its first appearance, along with Kong himself, in the 1933 film King Kong. ",
            starring: "Brenda Chapman, Jeff Nathanson",
            genres: "Adventures",
            tags: "Adventures,Animation,Family",
            cover: "../images/home2.jpg",
            video: "../video/video2.mp4",
            date: "10-JUL-2021",
            price: 30
          },
          {
            id: 3,
            title: "Pirates Sea",
            rating: 4.8,
            time: "2hr : 22mins",
            description: "Piracy is an act of robbery or criminal violence by ship or boat-borne attackers upon another ship or a coastal area, typically with the goal of stealing cargo and other valuable items or properties. ",
            starring: "James Chinlund, Jeff Nathanson",
            genres: "Adventures",
            tags: "Adventures,Action ",
            cover: "../images/home3.jpg",
            video: "../video/video3.mp4",
            date: "20-FEB-2010",
            price: 15
          },
          {
            id: 4,
            title: "Sand Dust",
            rating: 4.9,
            time: "2hr : 22mins",
            description: "Sand and dust storms (SDS), also known as sirocco, haboob, yellow dust, white storms, and the harmattan, are a natural phenomenon linked with land and water management and climate change.",
            starring: "Karen Gilchrist, James Earl Jones",
            genres: "Action",
            tags: "Action, Adventures, Horror",
            cover: "../images/home4.jpg",
            video: "../video/video4.mp4",
            date: "12-Aug-2015",
            price: 20
          },
];

const SeriesPage = () => {
    const { addToCart } = useCart();
  
    const handleAddToCart = (serie) => {
      addToCart(serie); 
    };
  
    return (
      <div className="seriesPage">
        <h1>Series</h1>
        <div className="seriesList">
          {seriesData.map((serie) => (
            <div key={serie.id} className="box">
              <div className="coverImage">
                <img src={serie.cover} alt={serie.title} />
              </div>
              <div className="content flex">
                <div className="details row">
                  <h1>{serie.title}</h1>
                  <p>{serie.description}</p>
                  <p>Rating: {serie.rating}</p> 
                  <p>Price: ${serie.price}</p>  


                  <button
                    className="primary-btn"
                    onClick={() => handleAddToCart(serie)}
                  >
                    <i></i> COMPRAR AHORA
                  </button>
                </div>
                <div className="palyButton row">
                  <Link to={`/singlepage/${serie.id}`}>
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
  
  export default SeriesPage;