import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import apiClient from "../../services/apiClient";
import defaultBookImg from "../../assets/images/books/book.svg";
import LoaderGrid from "../../components/Loader/LoaderGrid";

// icons
import { FaRegMoneyBillAlt, FaRegEye } from "react-icons/fa";
import { BiBookAlt } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

export default function Books() {
  const [loading, setLoading] = useState(false);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    setLoading(true);
    apiClient("/books")
      .then((res) => {
        console.log(res.data.payload.docs);
        setBooks(res.data.payload.docs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

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
          {!loading ? (
            books.map((book) => {
              return (
                <Link
                  key={book._id}
                  to={`/books/${book._id}`}
                  className="books__wrapper-item"
                >
                  <div className="img">
                    <img
                      src={
                        [".jpeg", ".jpg", ".png", ".svg"].includes(
                          book?.imageLink?.slice(book?.imageLink?.lastIndexOf("."))
                        ) && book?.imageLink?.startsWith("http")
                          ? book?.imageLink
                          : defaultBookImg
                      }
                      alt="book"
                    />
                  </div>

                  <div className="body">
                    <h1 className="name">
                      {book.title.length > 30
                        ? book.title.slice(0, 27) + "..."
                        : book.title}
                    </h1>
                    <p className="author">
                      <AiOutlineUser /> {book.author.firstName}{" "}
                      {book.author.lastName}
                    </p>
                    <p className="books">
                      <FaRegMoneyBillAlt />: ${book.price}
                    </p>
                    <p className="books">
                      <FaRegEye />: {book.views} view
                    </p>
                    <p className="books">
                      <BiBookAlt />: {book.pages} pages
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <LoaderGrid />
          )}
        </div>
      </div>
    </div>
  );
}
