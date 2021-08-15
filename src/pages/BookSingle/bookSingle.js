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
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    didMount();
  }, []);

  console.log("Single book => ", book);

  return (
    <div className="book-single">
      <div className="auto-container">
        <h1 align="center">Book single page</h1>
        {book ? (
          <>
          {
            book.imageLink &&
            <img
              src={
                [".jpeg", ".jpg", ".png", ".svg"].includes(
                  book?.imageLink.slice(book?.imageLink.lastIndexOf("."))
                ) && book?.imageLink.startsWith("http")
                  ? book?.imageLink
                  : defaultBookImg
              }
              alt="book"
            />
          }
            <p>
              Book title: <i>{book.title}</i>
            </p>
            <p>
              Book desc: <i>{book.description}</i>
            </p>
            <p>
              Book country: <i>{book.country}</i>
            </p>
            <p>
              Book author firstName: <i>{book.author.firstName}</i>
            </p>
            <p>
              Book author lastName: <i>{book.author.lastName}</i>
            </p>
            <p>
              Book author id: <i>{book.author._id}</i>
            </p>
            <p>
              Book author date_of_birth:{" "}
              <i>{new Date(book.author.date_of_birth).toLocaleDateString()}</i>
            </p>
            <p>
              Book author date_of_death:{" "}
              <i>{new Date(book.author.date_of_death).toLocaleDateString()}</i>
            </p>
            <p>
              Book author __v: <i>{book.author.__v}</i>
            </p>
            <p>
              Book isPublished: <i>{book.isPublished}</i>
            </p>
            <p>
              Book language: <i>{book.language}</i>
            </p>
            <p>
              Book link: <i>{book.link}</i>
            </p>
            <p>
              Book pages: <i>{book.pages}</i>
            </p>
            <p>
              Book price: <i>{book.price}</i>
            </p>
            <p>
              Book rate: <i>{book.rate}</i>
            </p>
            <p>
              Book updatedAt:{" "}
              <i>{new Date(book.updatedAt).toLocaleDateString()}</i>
            </p>
            <p>
              Book views: <i>{book.views}</i>
            </p>
            <p>
              Book year: <i>{book.year}</i>
            </p>
            <p>
              Book id: <i>{book._id}</i>
            </p>
            <p>
              Book __v: <i>{book.__v}</i>
            </p>
          </>
        ) : (
          <LoaderGrid />
        )}
      </div>
    </div>
  );
}
