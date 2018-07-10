
const fetchMovieData = async (key) => {
  const url = `https://api.themoviedb.org/3/movie/550?api_key=${key}`;
  const response = await fetch(url);
  const results = await response.json();
  return results;
};

export default fetchMovieData;