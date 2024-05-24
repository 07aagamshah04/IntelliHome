import RegisterPage from "./Components/RegisterPage";
import "./App.css";

import SignInPage from "./Components/SignInPage";
// import AddSubmission from "./Components/AddSubmiision";
import Posts from "./Components/Posts";
// import Calendar from "./Components/Calendar";
// import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
import HomePage from "./Components/HomePage";
function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
      {/* <HomePage /> */}
      {/* <AddSubmission/> */}
      {/* <Posts /> */}
    </>
  );
}
export default App;
