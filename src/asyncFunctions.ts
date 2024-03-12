// import axios from 'axios';
// import { Dispatch } from 'redux';
// import { loginUser, logoutUser, AuthActionTypes } from './actions';

// export const login = (username: string, password: string) => {
//   return async (dispatch: Dispatch<AuthActionTypes>) => {
//     const response = await axios.post('/login', { username, password });
//     dispatch(loginUser(response.data));
//   };
// };

// export const logout = () => {
//   return async (dispatch: Dispatch<AuthActionTypes>) => {
//     await axios.post('/logout');
//     dispatch(logoutUser());
//   };
// };