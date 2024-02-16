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

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/profileedit" element={<ProfileEdit />} />
      <Route path="/post" element={<Post />} />
      <Route path="/postedit" element={<PostEdit />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/" element={<Registration />} /> {/* Default route */}
    </Routes>
</Router>
  );
};

export default App;