const MovieCard = ({ movie, onSelectMovie, selectedIMDBId }) => {
  return (
    <li
      onClick={() => onSelectMovie(movie.imdbID)}
      className={`${
        selectedIMDBId === movie.imdbID ? 'list-movie-active' : ''
      }`}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📆</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

export default MovieCard;
