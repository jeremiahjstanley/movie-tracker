import { movieCleaner } from '../helper.js';

describe('Helper Tests', () => {

  it('should return an array of movies', () => {
    const mockFetchResults = {results: [
      {
        "vote_count": 7742,
        "id": 245891,
        "video": false,
        "vote_average": 7,
        "title": "John Wick",
        "popularity": 34.718,
        "poster_path": "/5vHssUeVe25bMrof1HyaPyWgaP.jpg",
        "original_language": "en",
        "original_title": "John Wick",
        "genre_ids": [
          28,
          53
        ],
        "backdrop_path": "/umC04Cozevu8nn3JTDJ1pc7PVTn.jpg",
        "adult": false,
        "overview": "Ex-hitman John Wick comes out of retirement to track down the gangsters that took everything from him.",
        "release_date": "2014-10-22"
      },
      {
        "vote_count": 11492,
        "id": 603,
        "video": false,
        "vote_average": 8,
        "title": "The Matrix",
        "popularity": 22.727,
        "poster_path": "/hEpWvX6Bp79eLxY1kX5ZZJcme5U.jpg",
        "original_language": "en",
        "original_title": "The Matrix",
        "genre_ids": [
          28,
          878
        ],
        "backdrop_path": "/7u3pxc0K1wx32IleAkLv78MKgrw.jpg",
        "adult": false,
        "overview": "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
        "release_date": "1999-03-30"
      }]};
    const result = movieCleaner(mockFetchResults);
    const expected = [
      { "backdrop_path": "/umC04Cozevu8nn3JTDJ1pc7PVTn.jpg", 
        "id": 245891, 
        "overview": "Ex-hitman John Wick comes out of retirement to track down the gangsters that took everything from him.", 
        "poster_path": "/5vHssUeVe25bMrof1HyaPyWgaP.jpg", 
        "release_date": "2014-10-22", 
        "tagline": undefined, 
        "title": 
        "John Wick", 
        "vote_average": 7 }, 
      { "backdrop_path": "/7u3pxc0K1wx32IleAkLv78MKgrw.jpg", 
        "id": 603, 
        "overview": "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.", 
        "poster_path": "/hEpWvX6Bp79eLxY1kX5ZZJcme5U.jpg", 
        "release_date": "1999-03-30", 
        "tagline": undefined, 
        "title": "The Matrix", 
        "vote_average": 8 }];

    expect(result).toEqual(expected);
  });
});