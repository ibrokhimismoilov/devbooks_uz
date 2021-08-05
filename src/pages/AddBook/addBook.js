import React, { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import defaultImg from "../../assets/images/books/defaultAddBook.svg";

export default function AddBook() {
  const [authors, setAuthors] = useState([]);
  const [waitResAnimate, setWaitResAnimate] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const [value, setValue] = useState({
    title: "" /* required */,
    author: authors || [] /* required */,
    description: "",
    country: "",
    imageLink: "",
    language: "",
    link: "",
    pages: "",
    year: "",
    rate: 0,
    price: "",
    category: "classic" /* classic | biography | science */,
    isPublished: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient("/authors");
        console.log(data);
        if (data.success) {
          setAuthors(data.payload);
        } else {
          console.log("Authors get response data.success=false: ", data);
        }
      } catch (err) {
        console.log("Authors get request noworking err: ", err);
      }
    })();
  }, []);

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };

  console.log(value);

  const submitHandler = async (e) => {
    e.preventDefault();
    setWaitResAnimate(true);
    for (let i = 0; i < e.target.length; i++) {
      e.target[i].setAttribute("disabled", "disabled");
    }
    try {
      const { data } = await apiClient.post("/books", value);
      setWaitResAnimate(false);
      if (data.success) {
        // console.log("data success 200", data);
        

      } else {
        // console.log("success=false: err =>", data);
        const msg = data?.msg;
        setUploadError(msg);
      }
      for (let i = 0; i < e.target.length; i++) {
        e.target[i].removeAttribute("disabled");
      }
    } catch (err) {
      // console.log("catch err =>",  err.response.data);
      const msg = err.response?.data || err.response?.data?.error;
      // console.log("login Error", msg);
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
          <label className="add__form-btn">
            <input type="file" hidden />
            Upload cover
          </label>
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
            <select
              name="author"
              value={value.author}
              onChange={inputHandler}
              required
            >
              {authors.map((item) => {
                const { _id, firstName, lastName } = item;
                return (
                  <option value={_id} key={_id}>
                    {`${firstName} ${lastName}`}
                  </option>
                );
              })}
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
