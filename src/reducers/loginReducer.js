export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return { email: action.email, password: action.password };
    case 'LOG_OUT':
      return { email: action.email };
    default:
      return state;
  }
}