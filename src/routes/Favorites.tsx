import { FunctionComponent, useState } from 'react';
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';

const Favorites: FunctionComponent = () => {
  const { favorites, setFavorites } = useMovieContext();
  const navigate = useNavigate();

  const deleteFavoriteMovie = (id: string) => {
    setFavorites(favorites.filter(movie => movie.imdbID !== id));
  }

  return (
    <>
      {favorites && favorites.length > 0 ? (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {favorites ? favorites.map((favoriteMovie) => (
            <MovieCard
              key={favoriteMovie.imdbID}
              id={favoriteMovie.imdbID}
              title={favoriteMovie.Title}
              image={favoriteMovie.Poster}
              year={favoriteMovie.Year}
              isEditable={true}
              onEdit={(id: string) => {
                navigate(`/edit/${id}`, {
                  state: {
                    movieId: id
                  }
                })
              }}
              onDelete={(id: string) => {
                deleteFavoriteMovie(id);
              }}
            />
          )) : null}
        </ul>
      ): (
        <p className="text-red-500">No favorites found.</p>
      )}
    </>
  );
};

export default Favorites;
