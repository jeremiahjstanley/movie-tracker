import { addFavorite, signUp, logIn, logOut, addMovies } from './';

describe('action tests', () => {

  describe('addMovies', () => {
    it('should return an object with type of add movies and movies', () => {
      const movies = [{title: 'Star Wars'}, {title: 'Emperors New Groove'}];
      const expected = { type: 'ADD_MOVIES', movies };
      const result = addMovies(movies);

      expect(result).toEqual(expected);
    });
  });

  describe('add favorite', () => {
    it('should return an object with a movie and a type of addFavorite', () => {
      const movie = { title: 'Emperors New Groove' };
      const expected = { movie: { title: 'Emperors New Groove' }, type:'ADD_FAVORITE'};
      const result = addFavorite(movie);

      expect(result).toEqual(expected);
    });
  });

  describe('signUp', () => {
    it('should return an object with type of sign up, username, email and password', () => {
      const userName = 'LukeSkywalker';
      const email = 'maytheforcebewithyou@aol.com';
      const id = '7';

      const result = signUp(userName, email, id);
      const expected = {type:'SIGN_UP', userName, email, id};

      expect(result).toEqual(expected);
    });
  });

  describe('logIn', () => {
    it('should return an object with type of logIn, email, nam and id', () => {
      const name = 'LukeSkywalker';
      const email = 'maytheforcebewithyou@aol.com';
      const id = '7';

      const result = logIn(email, name, id);
      const expected = { type: 'LOG_IN', email, name, id };

      expect(result).toEqual(expected);
    });
  });

  describe('logOut', () => {
    it('should return an object with type of logOut, email and name which are empty strings', () => {
      const email = '';
      const name = '';

      const result = logOut();
      const expected = { type: 'LOG_OUT', email, name };

      expect(result).toEqual(expected);
    });
  });


});