export const fetchMovieData = async (key) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_cast=2963`;
  const response = await fetch(url);
  const results = await response.json();
  return results;
};

export const fetchUser = async (email, password) => {
  const url = 'http://localhost:3000/api/users';
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });                                                     
    const results = await response.json();
    return await results;
  } catch (error) {
    Error(error);
  }
};

export const createUser = async (name, email, password) => {
  const url = 'http://localhost:3000/api/users/new';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const results = await response.json();
  if (results.error) {
    throw Error('failure to create user');
  }
};

export const getFavoritesFromDatabase = async (userId) => {
  const url = `http://localhost:3000/api/users/${userId}/favorites`;
  const response = await fetch(url);
  const results = await response.json();
  return results;
};

export const sendFavoriteToDatabase = async (movie, userId) => {
  const url = 'http://localhost:3000/api/users/favorites/new';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      'movie_id': movie.id, 
      'user_id': userId,
      'title': movie.title, 
      'poster_path': movie.poster_path, 
      'release_date': movie.release_date, 
      'vote_average': movie.vote_average, 
      'overview': movie.overview
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const results = await response.json();
  return results;
};

export const deleteFavoriteFromDatabase = async (movieId, userId) => {
  const url = `http://localhost:3000/api/users/${userId}/favorites/${movieId}`;
  const response = await fetch(url, {
    method: 'DELETE'
  });
  const results = await response.json();
  return results;
};