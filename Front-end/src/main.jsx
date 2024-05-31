/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegistrationPage from "./Components/RegisterPage.jsx";
import SignInPage from "./Components/SignInPage.jsx";
import AddSubmiision from "./Components/AddSubmiision.jsx";
import Posts from "./Components/Posts.jsx";
import HealthCare from "./Components/HealthCare.jsx";
import Homepage from "./Components/HomePage.jsx";
import Home from "./Components/Home.jsx";
import Calendar from "./Components/Calendar.jsx";
import Services from "./Components/landingPage/Services.jsx";
import Members from "./Components/Members.jsx";
import InviteMembers from "./Components/InviteMembers.jsx";
import MemberSection from "./Components/Member_Section.jsx";
import "./App.css";
import GroupChat from "./Components/GroupChat.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      { path: "/register-page", element: <RegistrationPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      {
        path: "/home",
        element: <Home />,
        children: [
          {
            path: "/home/dashboard",
            element: <Calendar />,
          },
          {
            path: "/home/healthcare",
            element: <HealthCare />,
          },
          {
            path: "/home/blogs",
            element: <Posts />,
          },
          {
            path: "/home/Intellivault",
            element: <AddSubmiision />,
          },
          {
            path: "/home/Members",
            element: <MemberSection />,
          },
          {
            path: "/home/Intellivault",
            element: <AddSubmiision />,
          },
          {
            path: "/home/groupchat",
            element: <GroupChat />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <RouterProvider router={router} />
  </>
);
