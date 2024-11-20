import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({
  item: { id, cover, name, rating, time, desc, starring, genres, tags, video },
}) => {
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className="rate">
        {[...Array(fullStars)].map((_, index) => (
          <i key={`full-${index}`} className="fas fa-star"></i>
        ))}
        {halfStars > 0 && <i className="fa fa-star-half"></i>}
        {[...Array(emptyStars)].map((_, index) => (
          <i key={`empty-${index}`} className="fa fa-star-o"></i>
        ))}
      </div>
    );
  };

  return (
    <div className="box">
      <div className="coverImage">
        <img src={cover} alt={`Cover of ${name}`} />
      </div>
      <div className="content flex">
        <div className="details row">
          <h1>{name}</h1>
          <div className="rating flex">
            {renderRating(rating)}
            <label>{rating} (IMDB)</label>
            <span>GP</span>
            <label>{time}</label>
          </div>
          <p>{desc}</p>
          <div className="cast">
            <h4>
              <span>Starring </span>
              {starring}
            </h4>
            <h4>
              <span>Genres </span>
              {genres}
            </h4>
            <h4>
              <span>Tags </span>
              {tags}
            </h4>
          </div>
           
          
        </div>
        <div className="palyButton row">
          <Link to={`/singlepage/${id}`}>
            <button>
              <div className="img">
                <img
                  src="./images/play-button.png"
                  alt="Play button"
                />
                <img src="./images/play.png" className="change" alt="Play hover" />
              </div>
              Mirar Trailer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
