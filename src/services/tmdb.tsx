import { TMDB_API_KEY } from '@env';

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchGenres = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    
    console.error('Error fetching genres:', error);
    return [];
  }
};

export const fetchMoviesByGenre = async (genreId: number | null) => {
  try {
    let url = '';

    if (genreId === null || genreId === -1) {


        url = `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
    } else {


        url = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US&page=1`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`TMDB error: ${response.status}`); }

    const data = await response.json();return data.results || [];
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return [];
  }
};

