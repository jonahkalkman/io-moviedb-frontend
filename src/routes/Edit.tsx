import { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormikErrors, FormikValues, useFormik } from 'formik';
import { useMovieContext } from '../contexts/MovieContext';
import InputField from '../components/atoms/InputField';

interface EditableMovie {
  title: string;
  year: string;
  actors: string;
}

const Edit: FunctionComponent = () => {
  const { favorites, setFavorites } = useMovieContext();
  const { movieId } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const movie = favorites.find((movie) => movie.imdbID === movieId);

  const placeholderImage =
    'https://images.placeholders.dev/?width=1000&height=1000&text=%22No%20poster%22';

  const updateFavorite = (values: EditableMovie) => {
    if (movie) {
      const updatedFavorites = favorites.map((movie) => {
        if (movie.imdbID === movieId) {
          setIsSubmitted(true);
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
      setHasError(true);
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
    setIsSubmitted(false);
    setHasError(false);
    formik.handleChange(e);
  };

  const renderError = (error: string | undefined) => {
    return <>{error ? <p className="mt-1 text-red-500">{error}</p> : null}</>;
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-0">
        {movie ? (
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
                    <InputField
                      title="title"
                      value={formik.values.title}
                      inputType="string"
                      onValueChange={handleInputChange}
                    />
                    {renderError(formik.errors.title)}
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
                    <InputField
                      title="year"
                      value={formik.values.year}
                      inputType="number"
                      onValueChange={handleInputChange}
                    />
                    {renderError(formik.errors.year)}
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
                    <InputField
                      title="actors"
                      value={formik.values.actors}
                      inputType="string"
                      onValueChange={handleInputChange}
                    />
                    {renderError(formik.errors.actors)}
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <button
                    className="active mb-2 block w-fit rounded bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Save favorite
                  </button>
                </div>
                {isSubmitted ? (
                  <p className="mt-5 text-green-500">
                    Succesfully updated the movie!
                  </p>
                ) : null}
                {hasError ? (
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
  );
};

export default Edit;
