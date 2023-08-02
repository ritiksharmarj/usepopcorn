import { useState } from 'react';
import { useFetchMovies } from './hooks/useFetchMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

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
  const [selectedIMDBId, setSelectedIMDBId] = useState(null);

  // Custom hook to store watched movies data
  const [watched, setWatched] = useLocalStorageState([], 'watched-movies');

  // Custom hook to fetch movies data
  const { movies, isLoading, error } = useFetchMovies(query);

  // Handle select movie to pass imdb id to "movie details component"
  const handleSelectMovie = (imdbID) => {
    setSelectedIMDBId((selectedIMDBId) =>
      imdbID === selectedIMDBId ? null : imdbID
    );
  };

  // Handle close movie when user click on back button
  function handleCloseMovie() {
    setSelectedIMDBId(null);
  }

  // Handle watch movie list, when user click "add to list" button after rating in the movie detail
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
