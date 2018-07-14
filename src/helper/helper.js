export const movieCleaner = response => {
  const movies = response.results.map(result => ({
    id: result.id,
    backdrop_path: result.backdrop_path,
    poster_path: result.poster_path,
    overview: result.overview,
    vote_average: result.vote_average,
    release_date: result.release_date,
    tagline: result.tagline,
    title: result.original_title
  })
  );
  return movies;
};