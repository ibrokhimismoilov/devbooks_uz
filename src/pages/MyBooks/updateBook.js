import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";
import defaultImg from "../../assets/images/books/defaultAddBook.svg";
import { getValidInputData } from "../../utils/validInputData";

const initialState = {
  title: "" /* required */,
  author: "" /* required */,
  description: "",
  country: "",
  language: "",
  pages: "",
  year: "",
  price: "",
  category: "",
};

const categories = ["classic", "biography", "science"];

export default function UpdateBook() {
  const history = useHistory();
  const params = useParams();
  const [uploadImg, setUploadImg] = useState("");
  const [authors, setAuthors] = useState([]);
  const [value, setValue] = useState(initialState);

  const [authorsError, setAuthorsError] = useState("");
  const [waitResAnimate, setWaitResAnimate] = useState(false);
  const [uploadError, setUploadError] = useState("");
  // const fileRef = useRef();
  // const imgRef = useRef();

  const fetchAuthors = async () => {
    try {
      const { data } = await apiClient("/authors");
      if (data.success) {
        setAuthors(data.payload);
      } else {
        setAuthorsError(
          data?.message || data?.msg || "Aftorlarni yuklay olmadi"
        );
      }
    } catch (err) {
      setAuthorsError(err?.message || err?.msg || "Aftorlarni yuklay olmadi");
    }
  };

  useEffect(() => {
    fetchAuthors();

    (async () => {
      try {
        const { data } = await apiClient(`/books/${params.id}`);
        // console.log("data => ", data.payload.book);
        if (data.success) {
          const {
            __v,
            isFeatured,
            isPublished,
            rate,
            updatedAt,
            views,
            _id,
            author,
            ...restBook
          } = data.payload.book;
          setValue(restBook);
        } else {
          console.log("UpdateBook success=false =>", data);
          setAuthorsError(
            data?.message || data?.msg || "Aftorlarni yuklay olmadi"
          );
        }
      } catch (err) {
        console.log("UpdateBook catch(err) =>", err);
        // setAuthorsError(err?.message || err?.msg || "Aftorlarni yuklay olmadi");
      }
    })();
  }, []);

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };
  console.log(value);

  // const uploadImgHandler = (e) => {
  //   if (e.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = function (e) {
  //       setUploadImg(e.target.result);
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  // if (fileRef?.current?.files[0] && imgRef?.current?.files[0]) {
  //   console.log(fileRef.current.files[0]);
  //   console.log(imgRef.current.files[0]);
  // }

  const submitHandler = async (e) => {
    e.preventDefault();
    setWaitResAnimate(true);
    console.log("value >>>>", value);
    for (let i = 0; i < e.target.length; i++) {
      e.target[i].setAttribute("disabled", "disabled");
    }

    try {
      const formDataToSubmit = getValidInputData(value, ["imageLink"]);

      const formData = new FormData();
      for (let x in formDataToSubmit) {
        formData.append(x, formDataToSubmit[x]);
      }

      // if (fileRef?.current?.files[0]) {
      //   formData.append("files", fileRef?.current?.files[0]);
      // }

      // if (imgRef?.current?.files[0]) {
      //   formData.append("files", imgRef?.current?.files[0]);
      // }

      // Display the key/value pairs
      // for (var pair of formData.entries()) {
      //   console.log("formData =>", pair[0] + ", " + pair[1]);
      // }

      const { data } = await apiClient.patch(
        `/books/${params.id}`,
        formDataToSubmit
      );
      //   console.log("data =>", data);

      if (data.success) {
        // console.log("success=true", data);
        history.replace("/books/my-books");
      } else {
        // console.log("success=false: err =>", data);
        const msg = data?.msg;
        setUploadError(msg);
      }
    } catch (err) {
      // console.log("catch err =>", err);
      // console.log("catch err =>", err?.response?.data);
      const msg = err?.response?.data || err?.response?.data?.error;
      setUploadError(msg);
    }

    setWaitResAnimate(false);
    for (let i = 0; i < e.target.length; i++) {
      e.target[i].removeAttribute("disabled");
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
          <img src={uploadImg || value.imageLink || defaultImg} alt="author" />
          {/* <label className="add__form-btn">
            <input
              type="file"
              ref={imgRef}
              // onChange={uploadImgHandler}
              hidden
            />
            Upload Image
          </label> */}
          {/* <label className="add__form-btn">
            <input type="file" ref={fileRef} hidden />
            Upload File
          </label> */}
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
          {authors.length ? (
            <div className="add__form-inputbox">
              <select
                name="author"
                value={value.author}
                onChange={inputHandler}
                multiple={false}
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
          ) : null}
          <div className="add__form-inputbox">
            <select
              name="category"
              value={value.category}
              onChange={inputHandler}
              required
            >
              {categories.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
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
            />
          </div>
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="year"
              name="year"
              value={value.year}
              onChange={inputHandler}
            />
          </div>
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="price"
              name="price"
              value={value.price}
              onChange={inputHandler}
            />
          </div>
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="country"
              name="country"
              value={value.country}
              onChange={inputHandler}
            />
          </div>
          <div className="add__form-inputbox">
            <input
              type="text"
              placeholder="language"
              name="language"
              value={value.language}
              onChange={inputHandler}
            />
          </div>
          <div className="add__form-inputbox add__form-inputbox--textarea">
            <textarea
              type="text"
              placeholder="description"
              name="description"
              value={value.description}
              onChange={inputHandler}
            />
          </div>

          {waitAnimate}
          {uploadError && <span className="error-msg">{uploadError}</span>}
          {authorsError && <span className="error-msg">{authorsError}</span>}

          <button className="add__form-btn">New book</button>
        </div>
      </div>
    </form>
  );
}
