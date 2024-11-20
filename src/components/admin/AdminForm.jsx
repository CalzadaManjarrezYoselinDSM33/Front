import React, { useState } from "react";
import "./adminform.css";

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('genre', genre);
    formData.append('releaseDate', releaseDate);
    formData.append('rating', rating);
    formData.append('image', image);
    formData.append('category', category);
    formData.append('price', price);

    try {
      const response = await fetch('http://localhost:5000/api/movies', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Película guardada con éxito');
        setTitle('');
        setDescription('');
        setGenre('');
        setReleaseDate('');
        setRating('');
        setImage(null);
        setCategory('');
        setPrice('');
      } else {
        alert('Hubo un error al guardar la película');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
            <h1>FREE MOVIE</h1>

      <label>
        Título:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Descripción:
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Género:
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
      </label>
      <label>
        Fecha de estreno:
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />
      </label>
      <label>
        Rating:
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </label>
      <label>
        Imagen:
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </label>
      <label>
      Categoría:
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Selecciona una categoría</option>
        <option value="upcoming">Próximas</option>
        <option value="recommended">Recomendadas</option>
        <option value="latest">Últimas</option>
      </select>
      </label>
      <label>
        Precio:
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <button type="submit">Guardar Película</button>
    </form>
  );
};

export default MovieForm;
