export const movieCleaner = response => {
  const movies = response.results.map(result => ({
    backdrop: result.backdrop_path,
    favorite: false,
    movieImage: result.poster_path,
    overview: result.overview,
    rating: result.vote_average,
    releaseDate: result.release_date,
    tagline: result.tagline,
    title: result.original_title
  })
  );
  return movies;
};