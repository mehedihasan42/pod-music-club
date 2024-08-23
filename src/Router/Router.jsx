import {
    createBrowserRouter
  } from "react-router-dom";
import Home from "../Home/Home/Home";
import SignUp from "../Authtication/SignUp/SignUp";
import SignIn from "../Authtication/SignIn/SignIn";
import PrivateRouter from "./PrivateRouter";
import SavedCart from "../Components/SavedCart/SavedCart";
import Admin from "../Home/Admin/Admin/Admin";
import AddItem from "../Home/Admin/AddItem/AddItem";
import EditPage from "../Home/Admin/EditPage/EditPage";

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
      path:"/saved",
      element:<PrivateRouter><SavedCart/></PrivateRouter>
    },
    {
      path:"/Admin",
      element:<Admin/>
    },
    {
      path:"/addItem",
      element:<AddItem/>
    },
    {
      path:"/editPage/:id",
      element:<EditPage/>
    }
  ]);