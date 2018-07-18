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


    it('should return an error message if the user fetch fails', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('failure to fetch user')))

      await expect(fetchUser('nick@cage.com', 'caseyP0e')).rejects.toEqual(Error('failure to fetch user'))
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


    it('should return an error if the create user fetch fails', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('failure to create user')))

      await expect(createUser('Nicolas', 'nick@cage.com', 'caseyP0e')).rejects.toEqual(Error('failure to create user'))
    });
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