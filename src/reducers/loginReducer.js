export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return { email: action.email, name: action.name, id: action.id };
    case 'LOG_OUT':
      return { email: action.email };
    default:
      return state;
  }
};