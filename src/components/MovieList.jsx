import { useState } from 'react';
import { tempMovieData } from '../data';
import MovieCard from './MovieCard';

const MovieList = () => {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <ul className='list'>
      {movies?.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;
