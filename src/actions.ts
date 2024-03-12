// import { IUser } from './ProfileDetails';

// // Define action types
// export const LOGIN_USER = 'LOGIN_USER';
// export const LOGOUT_USER = 'LOGOUT_USER';

// // Define action interfaces
// interface LoginUserAction {
//   type: typeof LOGIN_USER;
//   payload: IUser;
// }

// interface LogoutUserAction {
//   type: typeof LOGOUT_USER;
// }

// // Combine the action types
// export type AuthActionTypes = LoginUserAction | LogoutUserAction;

// // Define action creators
// export const loginUser = (user: IUser): AuthActionTypes => ({
//   type: LOGIN_USER,
//   payload: user,
// });

// export const logoutUser = (): AuthActionTypes => ({
//   type: LOGOUT_USER,
// });