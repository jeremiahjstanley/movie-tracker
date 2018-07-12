export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return { userName: action.userName, password: action.password };
    case 'LOG_OUT':
      return { userName: action.userName };
    default:
      return state;
  }
}