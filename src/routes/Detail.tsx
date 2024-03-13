import { FunctionComponent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Toggle from '../components/Toggle';
import { IMDBMovie } from '../model/movie';
import Spinner from '../components/Spinner';
import { useMovieContext } from '../contexts/MovieContext';
import { getMovieDetails } from '../api/getMovieDetails';

const Detail: FunctionComponent = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const { favorites, setFavorites } = useMovieContext();

  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<IMDBMovie>();

  const isFavorite =
    favorites.filter((movie) => movie.imdbID === movieId).length >= 1;

  useEffect(() => {
    const fetchData = async () => {
      if (movieId) {
        setLoading(true);

        try {
          const data = await getMovieDetails(movieId);
          setMovie(data);
        } catch (error) {
          setHasError(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [movieId]);

  const handleToggle = () => {
    if (movie && !isFavorite) {
      setFavorites([...favorites, movie]);
    } else {
      setFavorites(favorites.filter((movie) => movie.imdbID !== movie.imdbID));
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {movie ? (
            <div className="bg-white">
              <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                  <div>
                    <div className="w-full aspect-w-1 aspect-h-1">
                      <img
                        className="w-full h-full object-center object-cover sm:rounded-lg"
                        src={movie.Poster}
                        alt={movie.Title}
                      />
                    </div>
                  </div>
                  <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                    <Toggle isToggled={isFavorite} onToggle={handleToggle} />
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      {movie.Title}
                    </h1>
                    <div className="mt-3">
                      <p className="text-3xl text-gray-900">{movie.Year}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-xl text-gray-900">{movie.Actors}</p>
                    </div>
                    <div className="mt-6">
                      <h3 className="sr-only">Description</h3>
                      <div className="text-base text-gray-700 space-y-6">
                        <p>{movie.Plot}</p>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                      <button onClick={() => navigate(-1)}>Back to list</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
      {hasError ? (
        <p className="text-red-500 mt-5">
          Oops! Something went wrong, try again later.
        </p>
      ) : null}
    </>
  );
};

export default Detail;
