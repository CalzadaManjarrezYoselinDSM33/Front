import React from "react";
import Ucard from "./Ucard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <i className='fa fa-chevron-right'></i>
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <i className='fa fa-chevron-left'></i>
      </button>
    </div>
  );
};

const Upcomming = ({ items, title }) => {
  console.log("Películas en Upcomming:", items); // Log para verificar los datos recibidos

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className='upcome'>
      <div className='container'>
        <div className='heading flexSB'>
          <h1>{title}</h1>
        </div>
        <div className='content'>
          {items.length > 0 ? (
            <Slider {...settings}>
              {items.map((item) => (
                <Ucard key={item.id} item={item} />
              ))}
            </Slider>
          ) : (
            <p>No hay películas disponibles</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Upcomming;
