import React, { useState, useEffect } from "react";
import Homes from "../components/homes/Homes";
import Trending from "../components/trending/Trending";
import Upcomming from "../components/upcoming/Upcomming";
import { latest, recommended, upcome } from "../dummyData"; 

const HomePage = () => {
  const [items, setItems] = useState(upcome); 
  const [item, setItem] = useState(latest); 
  const [rec, setRec] = useState(recommended); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movies');
        const data = await response.json();

        if (data && Array.isArray(data)) {
          const upcomingMovies = data.filter(movie => movie.category === 'upcoming');
          const latestMovies = data.filter(movie => movie.category === 'latest');
          const recommendedMovies = data.filter(movie => movie.category === 'recommended');

          setItems(prevItems => [...prevItems, ...upcomingMovies]); 
          setItem(prevItems => [...prevItems, ...latestMovies]);
          setRec(prevItems => [...prevItems, ...recommendedMovies]); 
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);

       
        setItems(upcome);
        setItem(latest);
        setRec(recommended);
      }
    };

    fetchMovies();

  }, []); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <Trending />
      <Upcomming items={items} title="Próximas películas" />
      <Upcomming items={item} title="Últimas películas" /> 
      <Trending />
      <Upcomming items={rec} title="Películas recomendadas" /> 
    </>
  );
};

export default HomePage;
