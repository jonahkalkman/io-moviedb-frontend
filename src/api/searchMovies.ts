import { OverviewSearch } from '../model/search';
import { baseApiUrl } from './constants';

export const searchMovies = async (searchValue: string) => {
  try {
    const response = await fetch(`${baseApiUrl}&s=${searchValue}`);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data: OverviewSearch = await response.json();

    if (data.Response === 'False') {
      return null;
    }
    return data;
  } catch (error) {
    throw new Error('Error fetching data');
  }
};
