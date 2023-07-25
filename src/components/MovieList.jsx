import MovieCard from './MovieCard';

const MovieList = ({ movies, onSelectMovie, selectedIMDBId }) => {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
          selectedIMDBId={selectedIMDBId}
        />
      ))}
    </ul>
  );
};

export default MovieList;
