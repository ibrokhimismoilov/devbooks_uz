import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

// assets
import "./assets/scss/App.scss";
import authorImg from "./assets/images/authors/avloniy.svg";
import bookImg from "./assets/images/books/book.svg";

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

const authorsData = [
  {
    _id: 1,
    img: authorImg,
    firstName: "Abdulla",
    lastName: "Avloniy",
    date_of_birth: "1874",
    date_of_death: "1934",
    books: 34,
    audios: 13,
  },
  {
    _id: 2,
    img: authorImg,
    firstName: "Abdulla",
    lastName: "Avloniy",
    date_of_birth: "1874",
    date_of_death: "1934",
    books: 34,
    audios: 13,
  },
  {
    _id: 3,
    img: authorImg,
    firstName: "Abdulla",
    lastName: "Avloniy",
    date_of_birth: "1874",
    date_of_death: "1934",
    books: 34,
    audios: 13,
  },
  {
    _id: 4,
    img: authorImg,
    firstName: "Abdulla",
    lastName: "Avloniy",
    date_of_birth: "1874",
    date_of_death: "1934",
    books: 34,
    audios: 13,
  },
  {
    _id: 5,
    img: authorImg,
    firstName: "Abdulla",
    lastName: "Avloniy",
    date_of_birth: "1874",
    date_of_death: "1934",
    books: 34,
    audios: 13,
  },
  {
    _id: 6,
    img: authorImg,
    firstName: "Abdulla",
    lastName: "Avloniy",
    date_of_birth: "1874",
    date_of_death: "1934",
    books: 34,
    audios: 13,
  },
  {
    _id: 7,
    img: authorImg,
    firstName: "Abdulla",
    lastName: "Avloniy",
    date_of_birth: "1874",
    date_of_death: "1934",
    books: 34,
    audios: 13,
  },
  {
    _id: 8,
    img: authorImg,
    firstName: "Abdulla",
    lastName: "Avloniy",
    date_of_birth: "1874",
    date_of_death: "1934",
    books: 34,
    audios: 13,
  },
  {
    _id: 9,
    img: authorImg,
    firstName: "Abdulla",
    lastName: "Avloniy",
    date_of_birth: "1874",
    date_of_death: "1934",
    books: 34,
    audios: 13,
  },
  {
    _id: 10,
    img: authorImg,
    firstName: "Abdulla",
    lastName: "Avloniy",
    date_of_birth: "1874",
    date_of_death: "1934",
    books: 34,
    audios: 13,
  },
  {
    _id: 11,
    img: authorImg,
    firstName: "Abdulla",
    lastName: "Avloniy",
    date_of_birth: "1874",
    date_of_death: "1934",
    books: 34,
    audios: 13,
  },
];

const booksData = [
  {
    _id: 1,
    name: "Dunyoning ishlari",
    author: "O'tkir Hoshimov",
    point: 4.1,
    feedback: 1300,
    img: bookImg,
  },
  {
    _id: 2,
    name: "Dunyoning ishlari",
    author: "O'tkir Hoshimov",
    point: 4.1,
    feedback: 1300,
    img: bookImg,
  },
  {
    _id: 3,
    name: "Dunyoning ishlari",
    author: "O'tkir Hoshimov",
    point: 4.1,
    feedback: 1300,
    img: bookImg,
  },
  {
    _id: 4,
    name: "Dunyoning ishlari",
    author: "O'tkir Hoshimov",
    point: 4.1,
    feedback: 1300,
    img: bookImg,
  },
  {
    _id: 5,
    name: "Dunyoning ishlari",
    author: "O'tkir Hoshimov",
    point: 4.1,
    feedback: 1300,
    img: bookImg,
  },
  {
    _id: 6,
    name: "Dunyoning ishlari",
    author: "O'tkir Hoshimov",
    point: 4.1,
    feedback: 1300,
    img: bookImg,
  },
  {
    _id: 7,
    name: "Dunyoning ishlari",
    author: "O'tkir Hoshimov",
    point: 4.1,
    feedback: 1300,
    img: bookImg,
  },
  {
    _id: 8,
    name: "Dunyoning ishlari",
    author: "O'tkir Hoshimov",
    point: 4.1,
    feedback: 1300,
    img: bookImg,
  },
  {
    _id: 9,
    name: "Dunyoning ishlari",
    author: "O'tkir Hoshimov",
    point: 4.1,
    feedback: 1300,
    img: bookImg,
  },
  {
    _id: 10,
    name: "Dunyoning ishlari",
    author: "O'tkir Hoshimov",
    point: 4.1,
    feedback: 1300,
    img: bookImg,
  },
  {
    _id: 11,
    name: "Dunyoning ishlari",
    author: "O'tkir Hoshimov",
    point: 4.1,
    feedback: 1300,
    img: bookImg,
  },
  {
    _id: 12,
    name: "Dunyoning ishlari",
    author: "O'tkir Hoshimov",
    point: 4.1,
    feedback: 1300,
    img: bookImg,
  },
  {
    _id: 13,
    name: "Dunyoning ishlari",
    author: "O'tkir Hoshimov",
    point: 4.1,
    feedback: 1300,
    img: bookImg,
  },
  {
    _id: 14,
    name: "Dunyoning ishlari",
    author: "O'tkir Hoshimov",
    point: 4.1,
    feedback: 1300,
    img: bookImg,
  },
];

export default function App() {
  const [logged, setLogged] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <>
      {logged ? <Navbar logged={logged} setLoggedFunc={(e)=>setLogged(e)} /> : null}
      <Switch>
        <Route exact path="/">
          <Home logged={logged} authors={authorsData} />
        </Route>
        <Route exact path="/sign-in">
          <SignIn setLoggedFunc={(e)=>setLogged(e)} />
        </Route>
        <Route exact path="/sign-up">
          <SignUp setLoggedFunc={(e)=>setLogged(e)} />
        </Route>

        {logged ? (
          <>
            <Route exact path="/authors">
              <Authors logged={logged} authors={authorsData} />
            </Route>
            <Route exact path="/authors/:id">
              <AuthorSingle authors={authorsData} />
            </Route>

            <Route exact path="/books">
              <Books logged={logged} books={booksData} />
            </Route>
            <Route exact path="/books/:id">
              <BookSingle authors={authorsData} />
            </Route>
          </>
        ) : null}

        <Route component={NotFound} />
      </Switch>
    </>
  );
}
