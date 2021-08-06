import React, { useState } from "react";
// import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import defaultImg from "../../assets/images/authors/defaultAddAuthor.svg";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const initialState = {
  firstName: "" /* required */,
  lastName: "" /* required */,
  date_of_birth: null,
  date_of_death: null,
  // country: "",
  // bio: "",
};

export default function AddBook() {
  const history = useHistory();
  const [waitResAnimate, setWaitResAnimate] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [isDead, setIsDead] = useState(false);
  const [value, setValue] = useState(initialState);

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setWaitResAnimate(true);
    for (let i = 0; i < e.target.length; i++) {
      e.target[i].setAttribute("disabled", "disabled");
    }
    try {
      const requsetData = value.date_of_death
        ? value
        : {
            firstName: value.firstName,
            lastName: value.lastName,
            date_of_birth: value.date_of_birth,
          };

      const { data } = await apiClient.post("/authors", requsetData);
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
        console.log(
          "addAuthor data success false: ",
          data?.details[0]?.message
        );
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
          <label className="add__form-desc">
            <input
              type="checkbox"
              name="isDead"
              onChange={() => setIsDead((state) => !state)}
            />{" "}
            Is the author dead?
          </label>
          {isDead && (
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
          {/* <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="country"
              name="country"
              value={value.country}
              onChange={inputHandler}
              //   required
            />
          </div> */}
          {/* <div className="add__form-inputbox add__form-inputbox--textarea">
            <textarea
              type="text"
              placeholder="bio"
              name="bio"
              value={value.bio}
              onChange={inputHandler}
              // required
            />
          </div> */}

          {waitAnimate}
          {uploadError && <span className="error-msg">{uploadError}</span>}

          <button className="add__form-btn">New author</button>
        </div>
      </div>
    </form>
  );
}
