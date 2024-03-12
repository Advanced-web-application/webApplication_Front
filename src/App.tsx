// import { useState } from "react"
// import ListGroup from "./ListGroup"
// import Alert from "./Alert"


// function App() {
//   const [cities, setCities] = useState(["London", "New York", "Paris", "Tokyo", "Delhi", "Dubai"])
//   const [cars, setCars] = useState(["BMW", "Mercedes", "Audi", "Lamborghini", "Ferrari", "Porsche"])
//   const [displayAleret, setDisplayAlert] = useState(false)

//   const onDeleteCity = (index: number) => {
//     console.log("Deleting city at index: " + index)
//     const tmp = cities.filter((city, i) => i !== index)
//     setCities(tmp)
//   }

//   const onDeleteCar = (index: number) => {
//     console.log("Deleting car at index: " + index)
//     setCars(cars.filter((car, i) => i !== index))
//   }

//   const openAlert = () => {
//     setDisplayAlert(true)
//   }

//   const onDismiss = () => {
//     setDisplayAlert(false)
//   }
//   return (
//     <div className="p-2">
//       {displayAleret && <Alert onDismiss={onDismiss}>This is an Alert!!!</Alert>}
//       <h1>Cities!!</h1>
//       <ListGroup items={cities} onDeleteItem={onDeleteCity} />

//       <h1>Cars!!</h1>
//       <ListGroup items={cars} onDeleteItem={onDeleteCar} />
//       <div className="mx-auto pt-2 d-flex" style={{ width: "300px" }}>
//         <button type="button"
//           className="btn btn-primary flex-fill"
//           onClick={openAlert}>
//           Open alert
//         </button>
//       </div>
//     </div>
//   )
// }

// import PostsList from "./PostsList"


// function App() {
//   const [cities, setCities] = useState(["London", "New York", "Paris", "Tokyo", "Delhi", "Dubai"])
//   const [cars, setCars] = useState(["BMW", "Mercedes", "Audi", "Lamborghini", "Ferrari", "Porsche"])
//   const [displayAleret, setDisplayAlert] = useState(false)

//   const onDeleteCity = (index: number) => {
//     console.log("Deleting city at index: " + index)
//     const tmp = cities.filter((city, i) => i !== index)
//     setCities(tmp)
//   }

//   const onDeleteCar = (index: number) => {
//     console.log("Deleting car at index: " + index)
//     setCars(cars.filter((car, i) => i !== index))
//   }

//   const openAlert = () => {
//     setDisplayAlert(true)
//   }

//   const onDismiss = () => {
//     setDisplayAlert(false)
//   }
//   return (
//     <div className="p-2">
//       {displayAleret && <Alert onDismiss={onDismiss}>This is an Alert!!!</Alert>}
//       <h1>Cities!!</h1>
//       <ListGroup items={cities} onDeleteItem={onDeleteCity} />

//       <h1>Cars!!</h1>
//       <ListGroup items={cars} onDeleteItem={onDeleteCar} />
//       <div className="mx-auto pt-2 d-flex" style={{ width: "300px" }}>
//         <button type="button"
//           className="btn btn-primary flex-fill"
//           onClick={openAlert}>
//           Open alert
//         </button>
//       </div>
//     </div>
//   )
// }


// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// //import Profile from "./components/Profile_component"
// // import Post from "./components/Post_component"
// import Profile from "./components/Profile_edit"

//  import Post from "./components/Post_edit"
//  //import Post from "./components/Post_component"
//  import Registration from "./components/Registration"
//  import Feed from "./components/Feed"
// // import Currancy from "./components/Currancy-convertion"
// // import LogIn from "./components/Login_components"
// import LogIn from "./components/Login_components"
// // import Registration from "./components/Registration"


// function App() {
//   return (
//     <div className="p-2">
//       <Router>
//       <Switch>
//         <Route path="/about">
//           <Registration />
//         </Route>
//       </Switch>
//     </Router>

//     </div>
//   )
// }


// export default App



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from "./components/Profile_component"
import ProfileEdit from './components/Profile_edit';
import PostEdit from './components/Post_edit';
import Post from "./components/Post_component"
import Registration from './components/Registration';
import Feed from './components/Feed';
import LogIn from './components/Login_components';
import CurrancyConvert from './components/Currancy-convertion';
import AddPost from './components/addPost';

const App = () => {
  let accessToken = localStorage.getItem("accessToken");
  console.log("accessToken: " + accessToken);
  if(!accessToken)
  {
    accessToken=""
  }
  let userID = localStorage.getItem("userID");
  console.log("userID: " + userID);
  if(!userID)
  {
    userID=""
  }

  return (
    <Router>
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/profileedit" element={<ProfileEdit />} />
      <Route path="/post" element={<Post />} />
      <Route path="/addPost" element={<AddPost />} />
      <Route path="/postedit" element={<PostEdit />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/CurrancyConvert" element={<CurrancyConvert />} />
      <Route path="/feed" element={<Feed ID="" />} />
      <Route path="/login" element={<LogIn />} />
      {/* <Route path="/" element={<Registration />} /> Default route */}
      {/* <Route path="/" element={accessToken ? <Feed ID="" /> : <Registration />} /> */}
      <Route path="/" element={accessToken !== ""  ? <Feed ID= {userID} /> : <Registration />} />
    </Routes>
</Router>
  );
};

 export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Profile from "./components/Profile_component"
// import ProfileEdit from './components/Profile_edit';
// import PostEdit from './components/Post_edit';
// import Post from "./components/Post_component"
// import Registration from './components/Registration';
// import Feed from './components/Feed';
// import LogIn from './components/Login_components';
// import CurrancyConvert from './components/Currancy-convertion';

// const App = () => {
  
//   function isLoggedIn() {
//     const userID = localStorage.getItem('userID');
//     return userID !== null;
//   }
//   const loggedIn = isLoggedIn();
//   console.log("loggedIn: " + loggedIn);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={ <LogIn />} />
//         <Route path="/registration" element={loggedIn ? <Navigate to="/login" /> : <Registration />} />
//         <Route path="/profile" element={loggedIn ? <Profile /> : <Navigate to="/login" />} />
//         <Route path="/profileedit" element={loggedIn ? <ProfileEdit /> : <Navigate to="/login" />} />
//         <Route path="/post" element={loggedIn ? <Post /> : <Navigate to="/login" />} />
//         <Route path="/postedit" element={loggedIn ? <PostEdit /> : <Navigate to="/login" />} />
//         <Route path="/CurrancyConvert" element={loggedIn ? <CurrancyConvert /> : <Navigate to="/login" />} />
//         <Route path="/feed" element={loggedIn ? <Feed /> : <Navigate to="/login" />} />
//         <Route path="/" element={loggedIn ? <Navigate to="/login" /> : <Registration />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

