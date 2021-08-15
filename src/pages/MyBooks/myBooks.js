import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import defaultBookImg from "../../assets/images/books/book.svg";
import LoaderGrid from "../../components/Loader/LoaderGrid";
import apiClient from "../../services/apiClient";
import emptyBookShelf from "../../assets/images/books/bookshelf.jpg";

export default function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const getMyBooks = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient("/books/my-books");
      if (data.success) {
        setBooks(data.payload);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMyBooks();
  }, []);

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      await apiClient.delete("/books/" + id);
      getMyBooks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="books">
      <div className="auto-container">
        <div className="books__wrapper">
          {!loading ? (
            books.length ? (
              books.map((book) => {
                return (
                  <div key={book._id} className="books__wrapper-item">
                    {book?.imageLink && (
                      <div className="img">
                        <img
                          src={
                            [".jpeg", ".jpg", ".png", ".svg"].includes(
                              book?.imageLink.slice(
                                book?.imageLink.lastIndexOf(".")
                              )
                            ) && book?.imageLink.startsWith("http")
                              ? book?.imageLink
                              : defaultBookImg
                          }
                          alt="book"
                        />
                      </div>
                    )}
                    <div className="body">
                      <h1 className="name">
                        {book.title.length > 30
                          ? book.title.slice(0, 27) + "..."
                          : book.title}
                      </h1>
                      <p className="author">
                        {book.author.firstName} {book.author.lastName}
                      </p>
                      <p className="books">
                        price: ${book.price}&nbsp; ko'rilgan: {book.views}&nbsp;
                        sahifa: {book.pages}
                      </p>
                    </div>
                    <div className="footer">
                      <button
                        className="btn btn-delete"
                        onClick={() => deleteItem(book._id)}
                      >
                        delete
                      </button>
                      <button
                        className="btn btn-open"
                        onClick={() => history.push("/books/" + book._id)}
                      >
                        Open
                      </button>
                      <button
                        className="btn btn-edit"
                        // onClick={() => putItem(book._id)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <img
                className="books__bookshelf"
                src={emptyBookShelf}
                alt="bookshelf"
              />
            )
          ) : (
            <LoaderGrid />
          )}
        </div>
      </div>
    </div>
  );
}
