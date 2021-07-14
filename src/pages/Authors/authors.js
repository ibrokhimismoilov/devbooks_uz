import React from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../../components/Header";
import { RiBookFill, RiVolumeUpFill } from "react-icons/ri";
// import { useEffect, useState } from "react";
// import axios from "axios";

export default function Authors({ logged, authors }) {

  console.log("Authors page logged=", logged);

  // const [authors, setAuthors] = useState([]);

  // useEffect(() => {
  //   axios("https://book.alitechbot.uz/api/authors")
  //   .then(res => {
  //     console.log(res.data.payload);
  //     setAuthors(res.data.payload)
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }, [])

  if (!logged) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div className="authors">
      <Header />
      <div className="auto-container">
        <h1 className="authors-title">Asosiy kategoriyalar</h1>
        <div className="authors__filter">
          <button className="authors__filter-btn">Temuriylar davri</button>
          <button className="authors__filter-btn">Jadid adabiyoti</button>
          <button className="authors__filter-btn">Sovet davri</button>
          <button className="authors__filter-btn">Mustaqillik davri</button>
        </div>
        <div className="authors__wrapper">
          {authors.map((author) => {
            return (
              <Link
                key={author._id}
                to={`/authors/${author._id}`}
                className="authors__wrapper-item card"
              >
                <div className="card-img">
                  <img src={author.img} alt="author" />
                </div>

                <div className="card-body">
                  <h1 className="name">
                    {author.firstName} {author.lastName}
                  </h1>
                  <p className="year">
                    {author.date_of_birth} - {author.date_of_death}
                  </p>
                  <p className="books">
                    <RiBookFill /> {author.books} - <RiVolumeUpFill />{" "}
                    {author.audios}
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
