import { useEffect, useState } from 'react';
import { tempMovieData } from './data';

import NavBar from './components/NavBar';
import Box from './components/Box';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import WatchedMovieList from './components/WatchedMovieList';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import Search from './components/Search';
import MovieDetails from './components/MovieDetails';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedIMDBId, setSelectedIMDBId] = useState(null);

  useEffect(() => {
    // Cleaning up data fetching
    const controller = new AbortController();

    // Fetching movies data
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${
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

    handleCloseMovie(); // Close the movie details window before searching another movie
    fetchMovies();

    // Clean up function - abort controller
    return () => {
      controller.abort();
    };
  }, [query]);

  // Handle select movie to pass imdb id to "movie details component"
  const handleSelectMovie = (imdbID) => {
    setSelectedIMDBId((selectedIMDBId) =>
      imdbID === selectedIMDBId ? null : imdbID
    );
  };

  // Handle close movie when user click on back button
  const handleCloseMovie = () => {
    setSelectedIMDBId(null);
  };

  // Handle watch movie list, when user click "add to list" in the movie detail
  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  // Delete selected watched movie and update the watched
  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <NavBar movies={movies}>
        <Search query={query} setQuery={setQuery} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
              selectedIMDBId={selectedIMDBId}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedIMDBId ? (
            <MovieDetails
              selectedIMDBId={selectedIMDBId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
