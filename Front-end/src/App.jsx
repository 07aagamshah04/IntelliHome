/* eslint-disable no-unused-vars */
import RegisterPage from "./Components/RegisterPage";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer position="top-right" />
      {/* <Navbar /> */}
      <Outlet />
      {/* <HomePage /> */}
      {/* <AddSubmission/> */}
      {/* <Posts /> */}
    </>
  );
}
export default App;
