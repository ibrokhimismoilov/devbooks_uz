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
            <p>Book title:  <i>{book.title}</i></p>
            <p>Book desc: <i>{book.description}</i></p>
            <p>Book country:  <i>{book.country}</i></p>
            <p>Book author firstName: <i>{book.author.firstName}</i></p>
            <p>Book author lastName: <i>{book.author.lastName}</i></p>
            <p>Book author id: <i>{book.author._id}</i></p>
            <p>Book author date_of_birth: <i>{book.author.date_of_birth}</i></p>
            <p>Book author date_of_death: <i>{book.author.date_of_death}</i></p>
            <p>Book author __v: <i>{book.author.__v}</i></p>
            <p>Book isPublished: <i>{book.isPublished}</i> </p>
            <p>Book language: <i>{book.language}</i> </p>
            <p>Book link: <i>{book.link}</i> </p>
            <p>Book pages: <i>{book.pages}</i> </p>
            <p>Book price: <i>{book.price}</i> </p>
            <p>Book rate: <i>{book.rate}</i> </p>
            <p>Book updatedAt: <i>{book.updatedAt}</i> </p>
            <p>Book views: <i>{book.views}</i> </p>
            <p>Book year: <i>{book.year}</i> </p>
            <p>Book year: <i>{book.year}</i> </p>
            <p>Book id: <i>{book._id}</i> </p>
            <p>Book __v: <i>{book.__v}</i> </p>
          </>
        }
      </div>
    </div>
  );
}
