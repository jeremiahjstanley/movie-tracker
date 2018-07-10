import { toggleFavorite, signUp, logIn, logOut } from './';

describe('action tests', () => {

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


});