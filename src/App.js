import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

// assets
import "./assets/scss/App.scss";

// Pages
// import Home from "./pages/Home";
import Books from "./pages/Books/Books";
import Authors from "./pages/Authors/Authors";
import AddAuthor from "./pages/Authors/AddAuthor";
import AuthorSingle from "./pages/Authors/AuthorSingle";
import MyBooks from "./pages/Books/MyBooks";
import AddBook from "./pages/Books/AddBook";
import UpdateBook from "./pages/Books/UpdateBook";
import BookSingle from "./pages/Books/BookSingle";
import UserSettings from "./pages/UserSettings";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Navbar from "./components/Navbar";

export default function App() {
  const { token } = useSelector((state) => state.user);
  const store = useSelector((state) => state);

  console.log("REDUX STORE:", store);

  if (token) {
    return (
      <>
        <Navbar />
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/authors" component={Authors} />
          <Route exact path="/authors/add-author" component={AddAuthor} />
          <Route exact path="/authors/:id" component={AuthorSingle} />
          <Route exact path={["/books/my-books", "/"]} component={MyBooks} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/add-book" component={AddBook} />
          <Route exact path="/books/update/:id" component={UpdateBook} />
          <Route exact path="/books/:id" component={BookSingle} />
          <Route exact path="/user-settings" component={UserSettings} />
          <Route component={NotFound} />
        </Switch>
      </>
    );
  }

  return (
    <>
      <Switch>
        <Route exact path="/sign-up" component={SignUp} />
        <Route component={SignIn} />
      </Switch>
    </>
  );
}
