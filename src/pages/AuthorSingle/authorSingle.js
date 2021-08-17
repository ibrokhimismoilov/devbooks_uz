import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoaderGrid from "../../components/Loader/LoaderGrid";
import apiClient from "../../services/apiClient";

export default function AuthorSingle({ authors }) {
  const [author, setAuthor] = useState(false);
  const params = useParams();

  const didMount = async (e) => {
    try {
      const { data } = await apiClient(`/authors/${params.id}`);
      if (data.success) {
        // console.log(data.payload);
        setAuthor(data.payload);
      } else {
        // console.log(data);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    didMount();
  }, []);

  console.log("Single author => ", author);

  return (
    <div className="book-single">
      <div className="auto-container">
        <h1 align="center">Author single page</h1>
        {author ? (
          <>
            <p>Author firstName: {author.firstName}</p>
            <p>Author lastName: {author.lastName}</p>
            <p>Author id: {author._id}</p>
            <p>
              Author date_of_birth:{" "}
              {new Date(author.date_of_birth).toLocaleDateString()}
            </p>
            <p>
              Author date_of_death:{" "}
              {new Date(author.date_of_death).toLocaleDateString()}
            </p>
            <p>Author __v: {author.__v}</p>
          </>
        ) : (
          <LoaderGrid />
        )}
      </div>
    </div>
  );
}
