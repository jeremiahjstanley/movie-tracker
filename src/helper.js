export const movieCleaner = results => {
  return {
    title: results.original_title,
    releaseDate: results.release_date,
    rating: results.vote_average,
    tagline: results.tagline,
    movieImage: results.poster_path,
    overview: results.overview,
    favorite: false
  };
};