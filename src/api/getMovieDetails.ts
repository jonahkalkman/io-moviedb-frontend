import { IMDBMovie } from '../models/movie';
import { baseApiUrl } from './constants';

export const getMovieDetails = async (movieId: string): Promise<IMDBMovie> => {
  try {
    const response = await fetch(`${baseApiUrl}&i=${movieId}`);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data: IMDBMovie = await response.json();

    if (data.Response === 'False') {
      throw new Error('No data found for this movie ID');
    }

    return data;
  } catch (error) {
    throw new Error(
      `Error fetching data: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
