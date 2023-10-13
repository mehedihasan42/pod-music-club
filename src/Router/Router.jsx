import {
    createBrowserRouter
  } from "react-router-dom";
import Home from "../Home/Home/Home";
import SignUp from "../Authtication/SignUp/SignUp";
import SignIn from "../Authtication/SignIn/SignIn";
import Secret from "../Secret/Secret";
import PrivateRouter from "./PrivateRouter";
import SavedCart from "../Components/SavedCart/SavedCart";

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
    },
    {
      path:"/secret",
      element:<PrivateRouter><Secret/></PrivateRouter>
    },
    {
      path:"/saved",
      element:<PrivateRouter><SavedCart/></PrivateRouter>
    }
  ]);