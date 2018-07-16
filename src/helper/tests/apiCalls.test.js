import { fetchMovieData, fetchUser } from '../apiCalls.js';

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

  describe('FetchUserData', () => {
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
  });
});