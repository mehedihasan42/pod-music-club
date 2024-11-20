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
import Users from "../Home/Admin/Users/Users";
import Waiting from "../Components/Waiting/Waiting";
import AdminRouter from "./AdminRouter";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRouter><Home/></PrivateRouter>,
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
      element:<AdminRouter><Admin/></AdminRouter>
    },
    {
      path:"/addItem",
      element:<AdminRouter><AddItem/></AdminRouter>
    },
    {
      path:"/editPage/:id",
      element:<AdminRouter><EditPage/></AdminRouter>
    },
    {
      path:"/uses",
      element:<AdminRouter><Users/></AdminRouter>
    },
    {
      path:"/waiting",
      element:<Waiting/>
    }
  ]);