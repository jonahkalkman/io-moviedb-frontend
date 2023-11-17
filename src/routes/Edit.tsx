import { FunctionComponent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { IMDBMovie } from '../model/movie';
import { useMovieContext } from '../contexts/MovieContext';
import Spinner from '../components/Spinner';

interface EditableMovie {
  title: string;
  year: string;
  actors: string ;
}

enum FormStatus {
  Success = 'Success',
  Failed = 'Failed'
} 

const Edit: FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const {favorites, setFavorites} = useMovieContext();
  const { movieId } = useParams();
  const [movie, setMovie] = useState<IMDBMovie>();

  const updateFavorite = (values: EditableMovie) => {
    const movieToUpdate = favorites.find(movie => movie.imdbID === movieId);
  
    if (movieToUpdate) {
      const updatedFavorites = favorites.map(movie => {
        if (movie.imdbID === movieId) {
          formik.setStatus(FormStatus.Success);
          return { ...movie, ...{ Title: values.title, Year: values.year, Actors: values.actors } };
        }
        return movie;
      });
  
      setFavorites(updatedFavorites);
    } else {
      formik.setStatus(FormStatus.Failed);
    }
  };

  useEffect(() => {
    if (movieId) {
      const movie = favorites.find(movie => movie.imdbID === movieId);
      if (movie) {
        setMovie(movie);
        setLoading(false); 
      } else {
        setLoading(false);
      }
    }
  }, [movieId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: movie?.Title || '', 
      year: movie?.Year || '', 
      actors: movie?.Actors || '' 
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.title) {
        errors.title = 'Title is a required field';
      }
    
      if (!values.year) {
        errors.year = 'Year is a required field';
      }
    
      if (!values.actors) {
        errors.actors = 'Actors is a required field';
      }
    
      return errors;
    },
    onSubmit: values => {
      updateFavorite(values);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e); 
    // Reset the form status on input change
    formik.setStatus(null);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              <div>
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img className="w-full h-full object-center object-cover sm:rounded-lg" src={movie?.Poster} />
                </div>
              </div>
              {movie ? (
                <form onSubmit={formik.handleSubmit}>
                  <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <div className="mt-1">
                        <input
                          id="title"
                          name="title"
                          type="text"
                          className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                          onChange={handleInputChange}
                          value={formik.values.title}
                        />
                        {formik.errors.title ? <p className="text-red-500 mt-1">{formik.errors.title}</p> : null}
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-700">
                        Year
                      </label>
                      <div className="mt-1">
                        <input
                          id="year"
                          name="year"
                          type="text"
                          className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                          onChange={handleInputChange}
                          value={formik.values.year}
                        />
                        {formik.errors.year ? <p className="text-red-500 mt-1">{formik.errors.year}</p> : null}
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-700">
                        Actors
                      </label>
                      <div className="mt-1">
                        <input
                          id="actors"
                          name="actors"
                          type="text"
                          className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                          onChange={handleInputChange}                          
                          value={formik.values.actors}
                        />
                        {formik.errors.actors ? <p className="text-red-500 mt-1">{formik.errors.actors}</p> : null}
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                      <button
                        className="text-sm text-blue-500 hover:text-black"
                        type="submit"
                      >
                        Save favorite
                      </button>
                    </div>
                    {formik.status === FormStatus.Success ? <p className='text-green-500 mt-5'>Succesfully updated the movie!</p> : null}
                    {formik.status === FormStatus.Failed ? <p className='text-red-500 mt-5'>Failed to update the movie. Try again later.</p> : null}
                  </div>
                </form>
              ) : (
                <p className="text-red-500">Oops! Could not find the movie.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
