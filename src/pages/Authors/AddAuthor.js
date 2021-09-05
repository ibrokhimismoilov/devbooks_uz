import React, { useState } from "react";
import apiClient from "../../services/apiClient";
import defaultImg from "../../assets/images/authors/defaultAddAuthor.svg";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { getValidInputData } from "../../utils/validInputData";

const initialState = {
  firstName: "" /* required */,
  lastName: "" /* required */,
  date_of_birth: null,
  date_of_death: null,
  isDead: false,
};

export default function AddAuthor() {
  const history = useHistory();
  const [waitResAnimate, setWaitResAnimate] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [value, setValue] = useState(initialState);

  const inputHandler = (e) => {
    const { value, name, checked } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: name === "isDead" ? checked : value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setWaitResAnimate(true);
    for (let i = 0; i < e.target.length; i++) {
      e.target[i].setAttribute("disabled", "disabled");
    }
    try {
      const formDataToSubmit = getValidInputData(value, ["isDead"]);
      const { data } = await apiClient.post("/authors", formDataToSubmit);

      setWaitResAnimate(false);

      if (data.success) {
        setUploadError(null);

        Swal.fire({
          title: "Success",
          text: "Author has been added successfully",
          icon: "success",
          showCancelButton: true,
          cancelButtonText: "Finished added",
          confirmButtonText: "Add mores",
        }).then(({ value }) => {
          if (!value) {
            history.replace("/authors");
          }
          setValue(initialState);
        });
      } else {
        const msg = data?.details[0]?.message;
        setUploadError(msg);
      }

      for (let i = 0; i < e.target.length; i++) {
        e.target[i].removeAttribute("disabled");
      }
    } catch (err) {
      console.log("AddAuhtor catch(err): ", err);
      const msg = err.response?.data?.msg || err.response?.data?.error;

      setUploadError(msg);
      setWaitResAnimate(false);

      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
      });

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
          <label htmlFor="upload-book-img" className="add__form-btn">
            Upload cover
          </label>
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
              value={value?.firstName}
              onChange={inputHandler}
              required
            />
          </div>
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="lastName"
              name="lastName"
              value={value?.lastName}
              onChange={inputHandler}
              required
            />
          </div>
          <div className="add__form-inputbox">
            <input
              type="date"
              placeholder="date of birth"
              name="date_of_birth"
              value={value?.date_of_birth}
              onChange={inputHandler}
              //   required
            />
          </div>
          <label className="add__form-desc">
            <input type="checkbox" name="isDead" onChange={inputHandler} /> Is
            the author dead?
          </label>
          {value.isDead && (
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
          )}

          {waitAnimate}
          {uploadError && <span className="error-msg">{uploadError}</span>}

          <button className="add__form-btn">New author</button>
        </div>
      </div>
    </form>
  );
}
