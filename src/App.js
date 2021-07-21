import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// assets
import "./assets/scss/App.scss";

// Pages
import Navbar from "./components/Navbar";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuthorSingle from "./pages/AuthorSingle";
import BookSingle from "./pages/BookSingle";
import UserPage from "./pages/UserPage";

// Contexts
import AuthContext from "./context/AuthContext";
import UserSettings from "./pages/UserSettings";

const initialState = {
  token: null,
  isLoggedIn: false,
  user: {},
};

export default function App() {
  const [authDetails, setAuthDetails] = useState(initialState);
  const token = authDetails.token;

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setAuthDetails(initialState);
  };

  let user = JSON.parse(localStorage.user || "{}");

  useEffect(() => {
    user = JSON.parse(localStorage.user || "{}");
    const token = localStorage.token;

    if (token) {
      setAuthDetails((state) => ({
        ...state,
        isLoggedIn: true,
        token,
        user: user || {},
      }));
    }
  }, []);

  if (!token) {
    return (
      <AuthContext.Provider value={{ setAuthDetails }}>
        <Redirect exact to="/sign-in" />
        <Switch>
          <Route component={UserSettings} exact path="/" />
          <Route component={SignIn} exact path="/sign-in" />
          <Route component={SignUp} exact path="/sign-up" />
          <Route component={SignIn} />
        </Switch>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ setAuthDetails }}>
      <Redirect exact to="/" />
      <Navbar logoutHandler={logoutHandler} userName={user?.firstName} />
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/user-settings" component={UserSettings} />
        <Route exact path={"/authors"} component={Authors} />
        <Route exact path="/authors/:id" component={AuthorSingle} />
        <Route exact path={["/books", "/"]} component={Books} />
        <Route exact path="/books/:id" component={BookSingle} />
        <Route exact path="/user">
          <UserPage user={user} />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </AuthContext.Provider>
  );
}
