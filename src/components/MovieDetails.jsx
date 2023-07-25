import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';

const MovieDetails = ({ selectedIMDBId, onCloseMovie, onAddWatched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Destructure the movie details
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // Fetch movie details data
  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }&i=${selectedIMDBId}`
        );

        const data = await res.json();

        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetail();
  }, [selectedIMDBId]);

  // Handle watched list, when user "add to list" it will pass the movie data to watched
  const handleAddToWatchedList = () => {
    const newWatchedMovie = {
      imdbID: selectedIMDBId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
    };

    onAddWatched(newWatchedMovie);

    // Close movie after adding the "add to list"
    onCloseMovie();
  };

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='#000000'
                viewBox='0 0 256 256'
              >
                <path d='M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z'></path>
              </svg>
            </button>
            <img src={poster} alt={title} />

            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className='rating'>
              <StarRating maxRating={10} size={24} />

              <button className='btn-add' onClick={handleAddToWatchedList}>
                Add to list
              </button>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
