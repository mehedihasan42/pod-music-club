import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "../Home/Home/Home";
import SignUp from "../Authtication/SignUp/SignUp";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path:"/signup",
      element: <SignUp/>
    }
  ]);