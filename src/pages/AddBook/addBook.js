import React, { useState } from "react";
// import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import defaultImg from "../../assets/images/books/defaultAddBook.svg";

export default function AddBook() {
  const [waitResAnimate, setWaitResAnimate] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const [value, setValue] = useState({
    title: "" /* required */,
    author: "" /* required */,
    description: "",
    country: "",
    imageLink: "",
    language: "",
    link: "",
    pages: "",
    year: "",
    rate: "",
    price: "",
    category: "" /* classic | biography | science */,
    isPublished: true,
  });

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setWaitResAnimate(true);
    for (let i = 0; i < e.target.length; i++) {
      e.target[i].setAttribute("disabled", "disabled");
    }
    try {
      const { data } = await apiClient.post("/books", value);
      if (data.success) {
        setUploadError(null);
        setWaitResAnimate(false);
      } else {
        console.log(data);
        const msg = data?.msg;
        setUploadError(msg);
        setWaitResAnimate(false);
        for (let i = 0; i < e.target.length; i++) {
          e.target[i].removeAttribute("disabled");
        }
      }
    } catch (err) {
      console.log("login Error", err);
      const msg = err.response?.data?.msg || err.response?.data?.error;
      setUploadError(msg);
      setWaitResAnimate(false);
      for (let i = 0; i < e.target.length; i++) {
        e.target[i].removeAttribute("disabled");
      }
    }
  };

  let waitAnimate = null;
  if (waitResAnimate) {
    waitAnimate = (
      <div className="linear-activity">
        <div className="indeterminate"></div>
      </div>
    );
  }

  return (
    <form className="add" onSubmit={submitHandler}>
      <div className="add__img">
          <div className="add__img-inner">
            <img src={defaultImg} alt="default" />
            <input type="file" id="upload-book-img" hidden />
            <label htmlFor="upload-book-img" className="add__form-btn">Upload cover</label>
          </div>
      </div>
      <div className="add__form">
        <div className="add__form-inner">
          <h1 className="add__form-title">Add Book</h1>
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="title"
              name="title"
              value={value.title}
              onChange={inputHandler}
              required
            />
          </div>
          <div className="add__form-inputbox">
            <select name="author" value={value.author} required>
              <option>Abror</option>
              <option>Eshmatjon</option>
              <option>Xoshimjon</option>
            </select>
          </div>
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="pages"
              name="pages"
              value={value.pages}
              onChange={inputHandler}
              //   required
            />
          </div>
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="year"
              name="year"
              value={value.year}
              onChange={inputHandler}
              //   required
            />
          </div>
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="price"
              name="price"
              value={value.price}
              onChange={inputHandler}
              //   required
            />
          </div>      
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="country"
              name="country"
              value={value.country}
              onChange={inputHandler}
              //   required
            />
          </div>
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="language"
              name="language"
              value={value.language}
              onChange={inputHandler}
              //   required
            />
          </div>
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="imageLink"
              name="imageLink"
              value={value.imageLink}
              onChange={inputHandler}
              //   required
            />
          </div>
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="link"
              name="link"
              value={value.link}
              onChange={inputHandler}
              //   required
            />
          </div>
          <div className="add__form-inputbox add__form-inputbox--textarea">
            <textarea
              type="text"
              placeholder="description"
              name="description"
              value={value.description}
              onChange={inputHandler}
              // required
            />
          </div>

          {waitAnimate}
          {uploadError && <span className="error-msg">{uploadError}</span>}

          <button className="add__form-btn">New book</button>
        </div>
      </div>
    </form>
  );
}
