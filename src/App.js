import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import AddBook from "./pages/AddBook";
import AddAuthor from "./pages/AddAuthor";
import UserPage from "./pages/UserPage";
import UserSettings from "./pages/UserSettings";

// AUTH REDUX
import { clearUserAction, updateUserAction } from "./store/actions/userActions";
// import apiClient from "./services/apiClient";

export default function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(updateUserAction({ user, token }));
    } else {
      dispatch(clearUserAction());
    }
  }, []);

  if (token) {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/books/add-book" component={AddBook} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={BookSingle} />
          <Route exact path="/authors/add-author" component={AddAuthor} />
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
