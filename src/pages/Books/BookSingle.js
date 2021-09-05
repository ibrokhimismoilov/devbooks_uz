import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";
import defaultBookImg from "../../assets/images/books/book.svg";
import LoaderGrid from "../../components/Loader/LoaderGrid";

export default function BookSingle({ books }) {
  const [book, setBook] = useState(false);

  const params = useParams();

  const didMount = async (e) => {
    try {
      const { data } = await apiClient(`/books/${params.id}`);
      if (data.success) {
        setBook(data.payload.book);
        // console.log(data.payload.book);
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    didMount();
  }, []);

  // console.log("Single book => ", book);

  return (
    <div className="books-single">
      <div className="auto-container">
        <h1 align="center">{book.title}</h1>
        {book ? (
          <div className="books-single__wrapper">
            {book.imageLink && (
              <img
                className="books-single__img"
                src={
                  [".jpeg", ".jpg", ".png", ".svg"].includes(
                    book?.imageLink.slice(book?.imageLink.lastIndexOf("."))
                  ) && book?.imageLink.startsWith("http")
                    ? book?.imageLink
                    : defaultBookImg
                }
                alt="book"
              />
            )}
            <ul>
              <li>
                About of author
                <ul>
                  <li>
                    FullName: {book.author.firstName} {book.author.lastName}
                  </li>
                  <li>
                    Data:{" "}
                    {new Date(book.author.date_of_birth).toLocaleDateString()} /{" "}
                    {new Date(book.author.date_of_death).toLocaleDateString()}
                  </li>
                </ul>
              </li>
              <li>Link: {book.link}</li>
              <li>Pages: {book.pages}</li>
              <li>Price: {book.price}</li>
              <li>Views: {book.views}</li>
              <li>Year: {book.year}</li>
              <li>Country: {book.country}</li>
              <li>Language: {book.language}</li>
              <li>Updated: {new Date(book.updatedAt).toLocaleDateString()}</li>
              <li>Desc: {book.description}</li>
            </ul>
          </div>
        ) : (
          <LoaderGrid />
        )}
      </div>
    </div>
  );
}
