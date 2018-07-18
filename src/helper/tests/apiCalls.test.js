import { fetchMovieData, fetchUser, createUser, getFavoritesFromDatabase, sendFavoriteToDatabase, deleteFavoriteFromDatabase } from '../apiCalls.js';

describe('API Calls', () => {
  let mockUrl;
  beforeEach(() => {
    mockUrl = 'cage.com';

  });

  describe('fetchMovieData', () => {
    it('should fetch all the Nicolas Cage movies', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok:true,
        json: () => Promise.resolve({
          results: ['Nick Cage Movies']
        })
      }));
      const results = await fetchMovieData(mockUrl);
      expect(results).toEqual({ results: ['Nick Cage Movies']});
    });
  });

  describe('fetchUser', () => {
    it('should fetch a user', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true, 
        json: () => Promise.resolve({
          results: {email: 'tim@aol.com', password: 'password', id: 2}
        })
      }));
      const results = await fetchUser('tim@aol.com', 'password');
      const expected = { "results": { "email": "tim@aol.com", "id": 2, "password": "password" } };
      expect(results).toEqual(expected);
    });

    it('throws an error if the status is not ok', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject({
        statusd: 500
      }));

      const result = await fetchUser('Nick@jaol.edu', 'number1cage');
      const expected = undefined;

      
      expect(result).toEqual(expected); 
    });

    it('throws an error if the status is not ok', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject({
        statusd: 500
      }));

      const result = await createUser('Nick', 'Nick@jaol.edu', 'number1cage');
      const expected = undefined;

      
      expect(result).toEqual(expected); 
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          results: { id: 2 }
        })
      }));
      const results = await createUser('Tim', 'tim@aol.com', 'password');
      const expected = { "results": { "id": 2 } };

      expect(results).toEqual(expected);
    });

    it('should return an error when there is no response', () => {
      window.fetch = jest.fn().mockImplementationOnce(() => Promise.reject())

    })
  });

  describe('getFavoritesFromDatabase', () => {
    it('should fetch all your favorite Nicolas Cage movies', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          results: ['Nick Cage Movies']
        })
      }));

      const expected = {results: ['Nick Cage Movies']};
      const results = await getFavoritesFromDatabase(2);
      expect(results).toEqual(expected);
    });
  });

  describe('sendFavoriteToDatabase', () => {
    it('should send all your favorite Nicolas Cage movies and return new favorite id', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          results: { id: 2 }
        })
      }));
      const expected = { results: {id: 2} };
      const results = await sendFavoriteToDatabase('Con Air', 2222);
      expect(results).toEqual(expected);
    });
  });

  describe('deleteFavoriteFromDatabase', () => {
    it('should send all your favorite Nicolas Cage movies and return new favorite id', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          results: 'success'
        })
      }));
      const expected = {results: 'success'};
      const results = await deleteFavoriteFromDatabase(22222, 2);
      expect(results).toEqual(expected);
    });
  });
});