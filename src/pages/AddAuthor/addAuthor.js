import React, { useState } from "react";
// import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import defaultImg from "../../assets/images/authors/defaultAddAuthor.svg";

export default function AddBook() {
  const [waitResAnimate, setWaitResAnimate] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const [value, setValue] = useState({
    firstName: "" /* required */,
    lastName: "" /* required */,
    date_of_birth: "",
    date_of_death: "",
    createdAt: "",
    updatedAt: "",
    country: "",
    bio: "",
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
          <h1 className="add__form-title">Add author</h1>
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="firstName"
              name="firstName"
              value={value.firstName}
              onChange={inputHandler}
              required
            />
          </div>
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="lastName"
              name="lastName"
              value={value.lastName}
              onChange={inputHandler}
                required
            />
          </div>
          <div className="add__form-inputbox">
            <input
              type="date"
              placeholder="date of birth"
              name="date_of_birth"
              value={value.date_of_birth}
              onChange={inputHandler}
              //   required
            />
          </div>
          <div className="add__form-inputbox">
            <input
              type="date"
              placeholder="date of death"
              name="date_of_death"
              value={value.date_of_death}
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
          <div className="add__form-inputbox add__form-inputbox--textarea">
            <textarea
              type="text"
              placeholder="bio"
              name="bio"
              value={value.bio}
              onChange={inputHandler}
              // required
            />
          </div>

          {waitAnimate}
          {uploadError && <span className="error-msg">{uploadError}</span>}

          <button className="add__form-btn">New author</button>
        </div>
      </div>
    </form>
  );
}
