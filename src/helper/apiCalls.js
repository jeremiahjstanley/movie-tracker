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
    // console.log(results); 
    return await results;
  } catch (error) {
    // console.log(error);
    alert('incorrect username or password');
  }
};

export const createUser = async (name, email, password) => {
  const url = 'http://localhost:3000/api/users/new';
  try {
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
      alert(results.error);
    }
    return await results;
  } catch (error) {
    alert('email already exists');
  }
};

export const getFavoritesFromDatabase = async (userId) => {
  const url = `http://localhost:3000/api/users/${userId}/favorites`;
  try { 
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (error) {
    alert('Cannot get favorites');
  }
}

export const sendFavoriteToDatabase = async (movie, userId) => {
  console.log(movie, userId);
  const url = 'http://localhost:3000/api/users/favorites/new';
  try {
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
  } catch (error) {
    alert('you fucked up');
  }
};

export const deleteFavoriteFromDatabase = async (movieId, userId) => {
  const url = `http://localhost:3000/api/users/${userId}/favorites/${movieId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE'
    })
    const results = await response.json();
  } catch (error) {
    alert('You cannot unfavorite the Cage')
  }
};