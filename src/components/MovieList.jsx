import MovieCard from './MovieCard';

const MovieList = ({ movies, onSelectMovie }) => {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
};

export default MovieList;
