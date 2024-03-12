// // import { useNavigate } from 'react-router-dom';
// // import React, { useEffect } from 'react';
// // import { useSelector } from 'react-redux';
// // import { RootState } from '../store'; // replace with the path to your store
// // import { Route } from 'react-router-dom';
// // // import { ReactElement } from 'react';
// // interface PrivateRouteProps  {
// //   element: React.ReactElement;
// //   path: string;
// // }

// // const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path, ...rest }) => {
// //   const navigate = useNavigate();
// //   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

// //   useEffect(() => {
// //     if (!isAuthenticated) {
// //       navigate('/login');
// //     }
// //   }, [isAuthenticated, navigate]);

// //   return (
// //     <Route
// //       {...rest}
// //       path={path}
// //       element={isAuthenticated ? element : null}
// //     />
// //   );
// // };

// // export default PrivateRoute;

// import { useNavigate } from 'react-router-dom';
// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store'; // replace with the path to your store
// import { Route } from 'react-router-dom';

// interface PrivateRouteProps {
//   element: React.ReactElement;
//   path: string;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
//   const navigate = useNavigate();
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login');
//     }
//   }, [isAuthenticated, navigate]);

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? element : null}
//     />
//   );
// };

// export default PrivateRoute;