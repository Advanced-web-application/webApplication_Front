// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Profile from "./components/Profile_component"
// import ProfileEdit from './components/Profile_edit';
// import PostEdit from './components/Post_edit';
// import Post from "./components/Post_component"
// import Registration from './components/Registration';
// import Feed from './components/Feed';
// import LogIn from './components/Login_components';
// import CurrancyConvert from './components/Currancy-convertion';
// import AddPost from './components/addPost';

// const App = () => {
//   let accessToken = localStorage.getItem("accessToken");
//   console.log("accessToken: " + accessToken);
//   if(!accessToken)
//   {
//     accessToken=""
//   }
//   let userID = localStorage.getItem("userID");
//   console.log("userID: " + userID);
//   if(!userID)
//   {
//     userID=""
//   }

//   return (
//     <Router>
//     <Routes>
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/profileedit" element={<ProfileEdit />} />
//       <Route path="/post" element={<Post />} />
//       <Route path="/addPost" element={<AddPost />} />
//       <Route path="/postedit" element={<PostEdit />} />
//       <Route path="/registration" element={<Registration />} />
//       <Route path="/CurrancyConvert" element={<CurrancyConvert />} />
//       <Route path="/feed" element={<Feed ID="" />} />
//       <Route path="/login" element={<LogIn />} />
//       {/* <Route path="/" element={<Registration />} /> Default route */}
//       {/* <Route path="/" element={accessToken ? <Feed ID="" /> : <Registration />} /> */}
//       <Route path="/" element={accessToken !== ""  ? <Feed ID= {userID} /> : <Registration />} />
//     </Routes>
// </Router>
//   );
// };

//  export default App;

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
      <Route path="/post" element={<Post />} /> {/* This is the route for the /post component */}
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
