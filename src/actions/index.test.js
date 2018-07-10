import { toggleFavorite, signUp, logIn, logOut, fetchMovies } from './';

describe('action tests', () => {

  describe('fetchMovies', () => {
    it('should return an object with type of fetch movies and a url', () => {
      const url = 'www.google.com';
      const expected = { type: 'FETCH_MOVIES', url };
      const result = fetchMovies(url);

      expect(result).toEqual(expected);
    });
  });

  describe('toggle favorites', () => {
    it('should return an object with type of toggle favorties and an id', () => {
      const id = 7;
      const expected = {type:'TOGGLE_FAVORITE', id: 7};
      const result = toggleFavorite(id);

      expect(result).toEqual(expected);
    });
  });

  describe('signUp', () => {
    it('should return an object with type of sign up, username, email and password', () => {
      const username = 'LukeSkywalker';
      const email = 'maytheforcebewithyou@aol.com';
      const password = 'princessLeia';

      const result = signUp(username, password, email);
      const expected = {type:'SIGN_UP', username, password, email};

      expect(result).toEqual(expected);
    });
  });

  describe('logIn', () => {
    it('should return an object with type of logIn, username and password', () => {
      const username = 'LukeSkywalker';
      const password = 'princessLeia';

      const result = logIn(username, password);
      const expected = { type: 'LOG_IN', username, password };

      expect(result).toEqual(expected);
    });
  });

  describe('logOut', () => {
    it('should return an object with type of logOut, username', () => {
      const username = 'LukeSkywalker';

      const result = logOut(username);
      const expected = { type: 'LOG_OUT', username };

      expect(result).toEqual(expected);
    });
  });


});