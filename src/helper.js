export const movieCleaner = response => {
  const movies = response.results.map(result => ({
    title: result.original_title,
    releaseDate: result.release_date,
    rating: result.vote_average,
    tagline: result.tagline,
    movieImage: result.poster_path,
    overview: result.overview,
    favorite: false
  })
  );
  return movies;
};