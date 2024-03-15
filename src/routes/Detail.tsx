import { FunctionComponent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Toggle from '../components/atoms/Toggle';
import { IMDBMovie } from '../models/movie';
import Spinner from '../components/molecules/Spinner';
import { useMovieContext } from '../contexts/MovieContext';
import { getMovieDetails } from '../api/getMovieDetails';

const Detail: FunctionComponent = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const { favorites, setFavorites } = useMovieContext();

  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<IMDBMovie>();

  const placeholderImage =
    'https://images.placeholders.dev/?width=1000&height=1000&text=%22No%20poster%22';

  const isFavorite =
    favorites.filter((favoriteMovie) => favoriteMovie.imdbID === movieId)
      .length >= 1;

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
    if (movie) {
      if (!isFavorite) {
        setFavorites([...favorites, movie]);
      } else {
        setFavorites(
          favorites.filter(
            (favoriteMovie) => favoriteMovie.imdbID !== movie.imdbID,
          ),
        );
      }
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
              <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-0">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                  <div>
                    <div className="aspect-w-1 aspect-h-1 w-full">
                      <figure>
                        <img
                          className="h-full w-full object-cover object-center sm:rounded-lg"
                          src={
                            movie.Poster && movie.Poster !== 'N/A'
                              ? movie.Poster
                              : placeholderImage
                          }
                          alt={movie.Title}
                          loading="lazy"
                        />
                      </figure>
                    </div>
                  </div>
                  <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
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
                      <div className="space-y-6 text-base text-gray-700">
                        <p>{movie.Plot}</p>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                      <button
                        onClick={() => navigate(-1)}
                        className="active mb-2 block w-fit rounded bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400"
                      >
                        Back to list
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
      {hasError ? (
        <p className="mt-5 text-red-500">
          Oops! Something went wrong, try again later.
        </p>
      ) : null}
    </>
  );
};

export default Detail;
