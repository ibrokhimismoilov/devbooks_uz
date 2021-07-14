import React from "react";
import { Redirect, Link } from "react-router-dom";
import Header from "../../components/Header";
import { FaStar } from "react-icons/fa";

export default function Books({ logged, books }) {
  console.log("books page logged=", logged);

  if (!logged) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div className="books">
      <Header />
      <div className="auto-container">
        <h1 className="books-title">Asosiy kategoriyalar</h1>
        <div className="books__filter">
          <button className="books__filter-btn">Temuriylar davri</button>
          <button className="books__filter-btn">Jadid adabiyoti</button>
          <button className="books__filter-btn">Sovet davri</button>
          <button className="books__filter-btn">Mustaqillik davri</button>
        </div>
        <div className="books__wrapper">
          {books.map((book) => {
            return (
              <Link
                key={book._id}
                to={`/books/${book._id}`}
                className="books__wrapper-item card"
              >
                <div className="card-img">
                  <img src={book.img} alt="book" />
                </div>

                <div className="card-body">
                  <h1 className="name">
                    {book.name}
                  </h1>
                  <p className="author">
                    {book.author}
                  </p>
                  <p className="books">
                    <FaStar /> {book.point} - {book.feedback} fikrlar
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
