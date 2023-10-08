import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "../Home/Home/Home";
import SignUp from "../Authtication/SignUp/SignUp";
import SignIn from "../Authtication/SignIn/SignIn";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path:"/signup",
      element: <SignUp/>
    },
    {
      path:"/signIn",
      element:<SignIn/>
    }
  ]);