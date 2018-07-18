const initialState = [{
  id: 14361,
  backdrop_path: "/q8yzwvVm9PjusRI2rTG8gGk5xBM.jpg",
  poster_path: "/rvVQmoGJiMSsi3otft411TtNxdO.jpg",
  overview: "When mild-mannered Martin Harvey finds out that he has inherited a vintage yacht, he decides to take his family on a Caribbean vacation to retrieve the vessel. Upon arriving on a small island and realizing that the ship is in rough shape, Martin and his family end up with more than they bargained for as the roguish Captain Ron signs on to sail the boat to Miami. It doesn't take long before Ron's anything-goes antics get the Harveys into plenty of trouble.",
  vote_average: 10.0,
  release_date: "1992-09-18",
  tagline: "Martin just wanted a nice, quiet family vacation. Instead, he got... Captain Ron",
  title: "Captain Ron"
}];


export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MOVIES':
      return [...action.movies, ...state];
    default:
      return state;
  }
};