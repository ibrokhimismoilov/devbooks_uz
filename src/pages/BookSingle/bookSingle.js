import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";

export default function BookSingle({ books }) {
  const [book, setBook] = useState(false);
  console.log("bookSingle", books);

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

  console.log(book);

  return (
    <div className="book-single">
      <div className="auto-container">
        <h1 align="center">Book single page</h1>
        {
          book &&
          <>
            <img src={book.imageLink} alt="" />
            <p>Book title: {book.title}</p>
            <p>Book desc: {book.description}</p>
            <p>Book country: {book.country}</p>
            <p>Book author firstName: {book.author.firstName}</p>
            <p>Book author lastName: {book.author.lastName}</p>
            <p>Book author id: {book.author._id}</p>
            <p>Book author date_of_birth: {book.author.date_of_birth}</p>
            <p>Book author date_of_death: {book.author.date_of_death}</p>
            <p>Book author __v: {book.author.__v}</p>
            <p>Book isPublished: {book.isPublished}</p>
            <p>Book language: {book.language}</p>
            <p>Book link: {book.link}</p>
            <p>Book pages: {book.pages}</p>
            <p>Book price: {book.price}</p>
            <p>Book rate: {book.rate}</p>
            <p>Book updatedAt: {book.updatedAt}</p>
            <p>Book views: {book.views}</p>
            <p>Book year: {book.year}</p>
            <p>Book year: {book.year}</p>
            <p>Book id: {book._id}</p>
            <p>Book __v: {book.__v}</p>
          </>
        }
      </div>
    </div>
  );
}
