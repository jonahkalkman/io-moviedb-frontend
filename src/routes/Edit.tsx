import { FunctionComponent } from 'react';
import { FormikErrors, FormikValues, useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useMovieContext } from '../contexts/MovieContext';

interface EditableMovie {
  title: string;
  year: string;
  actors: string;
}

enum FormStatus {
  Success = 'Success',
  Failed = 'Failed',
}

const Edit: FunctionComponent = () => {
  const { favorites, setFavorites } = useMovieContext();
  const { movieId } = useParams();
  const movie = favorites.find((movie) => movie.imdbID === movieId);

  const updateFavorite = (values: EditableMovie) => {
    if (movie) {
      const updatedFavorites = favorites.map((movie) => {
        if (movie.imdbID === movieId) {
          formik.setStatus(FormStatus.Success);
          return {
            ...movie,
            ...{
              Title: values.title,
              Year: values.year,
              Actors: values.actors,
            },
          };
        }
        return movie;
      });

      setFavorites(updatedFavorites);
    } else {
      formik.setStatus(FormStatus.Failed);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: movie?.Title ?? '',
      year: movie?.Year ?? '',
      actors: movie?.Actors ?? '',
    },
    validate: (values: FormikValues) => {
      const errors: FormikErrors<FormikValues> = {};
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
    onSubmit: (values) => {
      updateFavorite(values);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    // Reset the form status on input change
    formik.setStatus(null);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {movie ? (
            <div>
              <div>
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                    src={movie.Poster}
                    alt={movie.Title}
                    loading="lazy"
                  />
                </div>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <div className="mb-8">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <div className="mt-1">
                      <input
                        id="title"
                        name="title"
                        type="text"
                        className="block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                        onChange={handleInputChange}
                        value={formik.values.title}
                      />
                      {formik.errors.title ? (
                        <p className="mt-1 text-red-500">
                          {formik.errors.title}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mb-8">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="year"
                    >
                      Year
                    </label>
                    <div className="mt-1">
                      <input
                        id="year"
                        name="year"
                        type="text"
                        className="block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                        onChange={handleInputChange}
                        value={formik.values.year}
                      />
                      {formik.errors.year ? (
                        <p className="mt-1 text-red-500">
                          {formik.errors.year}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mb-8">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="actors"
                    >
                      Actors
                    </label>
                    <div className="mt-1">
                      <input
                        id="actors"
                        name="actors"
                        type="text"
                        className="block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                        onChange={handleInputChange}
                        value={formik.values.actors}
                      />
                      {formik.errors.actors ? (
                        <p className="mt-1 text-red-500">
                          {formik.errors.actors}
                        </p>
                      ) : null}
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
                  {formik.status === FormStatus.Success ? (
                    <p className="mt-5 text-green-500">
                      Succesfully updated the movie!
                    </p>
                  ) : null}
                  {formik.status === FormStatus.Failed ? (
                    <p className="mt-5 text-red-500">
                      Failed to update the movie. Try again later.
                    </p>
                  ) : null}
                </div>
              </form>
            </div>
          ) : (
            <p className="text-red-500">Oops! Could not find the movie.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;
