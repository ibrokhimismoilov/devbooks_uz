import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

// assets
import "./assets/scss/App.scss";

// Pages
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import Home from "./pages/Home";
import AuthorSingle from "./pages/AuthorSingle";
import BookSingle from "./pages/BookSingle";
import UserPage from "./pages/UserPage";
import UserSettings from "./pages/UserSettings";

// AUTH REDUX
import { clearUserAction, updateUserAction } from "./store/actions/userActions";
import { UPDATE_USER } from "./store/actionTypes";
import apiClient from "./services/apiClient";

export default function App() {
  const dispatch = useDispatch();
  let token = localStorage.token;

  useEffect(() => {

    
    const getUserFunc = async () => {
      const {data} = await apiClient.get("/users");
      console.log("local data", data);
      if (token) {
        dispatch(updateUserAction({user: data.user, token}));
      } 
      else {
        dispatch(clearUserAction());
      }
    }

    getUserFunc()

  }, []);

  if (token) {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={BookSingle} />
          <Route exact path="/authors" component={Authors} />
          <Route exact path="/authors/:id" component={AuthorSingle} />
          <Route exact path="/user-settings" component={UserSettings} />
          <Route exact path="/user" component={UserPage} />
          <Route component={NotFound} />
        </Switch>
      </>
    );
  }

  return (
    <>
      <Switch>
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route component={SignIn} />
      </Switch>
    </>
  );
}
