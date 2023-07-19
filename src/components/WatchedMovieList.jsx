import WatchedMovieCard from './WatchedMovieCard';

const WatchedMovieList = ({ watched }) => {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovieCard key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
