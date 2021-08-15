import React, { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

export default function UpdateBookModal(id) {
  const [authors, setAuthors] = useState([]);
  const [value, setValue] = useState({
    title: "",
    author: authors || [],
    description: "",
    country: "",
    language: "",
    link: "",
    pages: "",
    year: "",
    price: "",
    // imageLink: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.patch("/authors");
        console.log(data);
        if (data.success) {
          setAuthors(data.payload);
        } else {
          console.log("Authors get response data.success=false: ", data);
        }
      } catch (err) {
        console.log("Authors get request noworking - err: ", err);
      }
    })();
  }, []);

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };

  console.log(value);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="modal-outer">
      <div className="modal">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="title"
            value={value.title}
            placeholder="title"
          />
          {authors.length ? (
            <select name="author" value={value.id} onChange={inputHandler}>
              <option value={authors._id}>{authors.firstName}</option>
            </select>
          ) : null}
          <input
            onChange={inputHandler}
            type="text"
            name="country"
            value={value.country}
            placeholder="country"
          />
          <input
            onChange={inputHandler}
            type="text"
            name="language"
            value={value.language}
            placeholder="language"
          />
          <input
            onChange={inputHandler}
            type="text"
            name="link"
            value={value.link}
            placeholder="link"
          />
          <input
            onChange={inputHandler}
            type="text"
            name="pages"
            value={value.pages}
            placeholder="pages"
          />
          <input
            onChange={inputHandler}
            type="date"
            name="year"
            value={value.year}
            placeholder="year"
          />
          <input
            onChange={inputHandler}
            type="text"
            name="price"
            value={value.price}
            placeholder="price"
          />
          <input
            onChange={inputHandler}
            type="text"
            name="description"
            value={value.description}
            placeholder="description"
          />
        </form>
      </div>
    </div>
  );
}
