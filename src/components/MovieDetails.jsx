import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';

const MovieDetails = ({
  selectedIMDBId,
  onCloseMovie,
  onAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  // Boolean: check if "selectedIMDBId" is already present in the watched array or not
  const isWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedIMDBId);

  // Get the "userRating" from the current selected movie detail if already rated
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedIMDBId
  )?.userRating;

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
      userRating,
    };

    onAddWatched(newWatchedMovie);

    // Close movie after adding the "add to list"
    onCloseMovie();
  };

  // Press "escape" key to close movie details window
  useEffect(() => {
    const callback = (e) => {
      if (e.code === 'Escape') {
        onCloseMovie();
      }
    };

    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [onCloseMovie]);

  // Movie page title
  useEffect(() => {
    // If title is undefined or null
    if (!title) return;

    document.title = `${title}`;

    // Cleanup function
    return () => {
      document.title = 'usePopcorn';
    };
  }, [title]);

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
              {/* If user already rated selected movie then show the "watchedUserRating" */}
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {/* User rating should be greater than 0 to add movie in watched list */}
                  {userRating > 0 && (
                    <button
                      className='btn-add'
                      onClick={handleAddToWatchedList}
                    >
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating} star.</p>
              )}
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
