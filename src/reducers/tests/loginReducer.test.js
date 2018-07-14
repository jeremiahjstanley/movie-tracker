import { loginReducer } from '../loginReducer.js';
import * as actions from '../../actions';

describe('Login Reducter tests', () => {

  it('should return the initial state', () => {
    const expected = {};
    const results = loginReducer(undefined, {});

    expect(results).toEqual(expected);
  });

  it('should return state with a name, email and password', () => {
    const user = { email: 'nickcage@aol.com', name: 'Nick Cage', id: '7' };
    const expected = user;
    const results = loginReducer(undefined, actions.logIn('nickcage@aol.com', 'Nick Cage', '7'));

    expect(results).toEqual(expected);
  });

  it('should return an email address that is an empty string', () => {
    const expected = {email: ''};
    const results = loginReducer(undefined, actions.logOut());

    expect(results).toEqual(expected);
  });
});