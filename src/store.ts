// // // store.ts
// // import { configureStore } from '@reduxjs/toolkit';
// // import thunk from 'redux-thunk';
// // import { authReducer } from './reducer';

// // // Define RootState
// // export type RootState = ReturnType<typeof store.getState>;

// // export const store = configureStore({
// //     reducer: authReducer,
// //     middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk as any),
// // });
// // store.ts
// // store.ts
// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import { authReducer } from './reducer';

// const rootReducer = combineReducers({
//   auth: authReducer,
//   // other reducers...
// });

// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk as any),
// });

// // Define RootState
// export type RootState = ReturnType<typeof store.getState>;