import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import defaultImg from "../../assets/images/authors/avloniy.svg";
import apiClient from "../../services/apiClient";
import LoaderGrid from "../../components/Loader/LoaderGrid";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient("/authors")
      .then((res) => {
        // console.log(res.data.payload);
        setAuthors(res.data.payload);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="authors">
      <Header />
      <div className="auto-container">
        <h1 className="authors-title">Barcha mualliflar</h1>
        <div className="authors__wrapper">
          {!loading ? (
            authors.map((author) => {
              return (
                <Link
                  key={author._id}
                  to={`/authors/${author._id}`}
                  className="authors__wrapper-item card"
                >
                  <div className="card-img">
                    <img src={author.img || defaultImg} alt="author" />
                  </div>

                  <div className="card-body">
                    <h1 className="name">
                      {author.firstName} {author.lastName}
                    </h1>
                    <p className="year">
                      {new Date(author.date_of_birth).toLocaleDateString()} -{" "}
                      {new Date(author.date_of_death).toLocaleDateString()}
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
