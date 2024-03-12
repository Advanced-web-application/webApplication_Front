// import { IUser } from './ProfileDetails';
// import { AuthActionTypes, LOGIN_USER, LOGOUT_USER } from './actions';

// // Define the state interface
// interface AuthState {
//   isAuthenticated: boolean;
//   user: IUser;
// }

// // Define the initial state
// const initialState: AuthState = {
//   isAuthenticated: false,
//   user: null,
// };

// // Define the reducer
// export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
//   switch (action.type) {
//     case LOGIN_USER:
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload,
//       };
//     case LOGOUT_USER:
//         return {
//             ...state,
//             isAuthenticated: false,
//             user: null,
//         };
//     default:
//       return state;
//   }
// };