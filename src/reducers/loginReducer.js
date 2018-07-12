export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return { email: action.email, name: action.name };
    case 'LOG_OUT':
      return { email: action.email };
    default:
      return state;
  }
};