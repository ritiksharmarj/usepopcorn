import { useState, useEffect } from 'react';
import { tempMovieData } from '../data';

export const useFetchMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cleaning up data fetching
    const controller = new AbortController();

    // Fetching movies data
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }&s=${query}`,
          { signal: controller.signal }
        );

        // If there is no response
        if (!res.ok)
          throw new Error('Something went wrong with fetching movies!');

        const data = await res.json();

        // If there is no movie
        if (data.Response === 'False') throw new Error('Movie not found!');

        setMovies(data.Search);
        setError('');
      } catch (error) {
        // Set error if error is different from the "AbortError"
        if (error.name !== 'AbortError') setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // If there is no query or less then 3 letter to search movie, show temporary movie data
    if (query.length < 3) {
      setMovies(tempMovieData);
      setError('');
      return;
    }

    fetchMovies();

    // Clean up function - abort controller
    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
};
