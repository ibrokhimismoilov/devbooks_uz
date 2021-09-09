import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VscDeviceCamera } from "react-icons/vsc";
import apiClient from "../services/apiClient";
import defaultAvatar from "../assets/images/user.png";
import { getValidInputData } from "../utils/validInputData";
import {
  clearUserAction,
  updateTheme,
  updateUserAction,
} from "../store/actions/userActions";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function UserSettings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [theme, setTheme] = useState("light");
  const { user, token } = useSelector((state) => state.user);
  const { _id, __v, updatedAt, shelf, createdAt, isAdmin, ...userData } = user;
  const [updateUser, setUpdateUser] = useState({ ...userData });

  const deleteHandler = async () => {
    if (window.confirm("Are you deleted Account")) {
      try {
        const { data } = await apiClient.delete("/users");
        if (data.success) {
          dispatch(clearUserAction());
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const themeHandler = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    if (name === "imgFile") {
      if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          setUpdateUser((state) => ({ ...state, [name]: e.target.result }));
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setUpdateUser((state) => ({ ...state, [name]: value }));
    }
  };

  // const chekPassword = (data, newPass = "", confirmPas = "") => {
  //   // if (!newPass.trim().length && !confirmPas.trim().length) {
  //   //   return { ...data };
  //   // } else if (newPass.length < 6 || confirmPas.length < 6) {
  //   //   return "Parol 6 tadan kam bo'lmasligi kerak";
  //   // } else if (newPass !== confirmPas) {
  //   //   return "Yangi parollar mos emas";
  //   // } else {
  //   //   return { password: newPass, ...data };
  //   // }
  //   if (newPass.length && confirmPas.length) {
  //     return "Password backend dan ishlamayabdi, Parolni o'zgartirmang!";
  //   } else if (newPass.length < 0 || confirmPas.length < 0) {
  //     return { ...data };
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword, ...data } = updateUser;

    // const resultData = chekPassword(data, newPassword, confirmPassword);

    // if (typeof resultData !== "string") {
    // const validData = getValidInputData(resultData);
    const validData = getValidInputData(data);
    try {
      for (let i = 0; i < e.target.length; i++) {
        e.target[i].setAttribute("disabled", "disabled");
      }
      console.log("request =>> ", validData);
      const { data } = await apiClient.patch("/users", validData);
      dispatch(updateTheme(theme));
      console.log("res =>> ", data);
      if (data.success) {
        dispatch(updateUserAction({ user: data.payload, token: token }));
        Swal.fire({
          title: "Muoffaqiyatlik",
          text: "User updated",
          icon: "success",
          showCancelButton: true,
          cancelButtonText: "Home page",
          confirmButtonText: "Ok",
        }).then(({ value }) => {
          if (!value) {
            history.replace("/");
          }
        });
      } else {
        Swal.fire({
          title: "Xatolik",
          text: data.error,
          icon: "error",
        });
      }
      for (let i = 0; i < e.target.length; i++) {
        e.target[i].removeAttribute("disabled");
      }
    } catch (err) {
      const msg = err.response?.data?.msg || err.response?.data?.error;
      Swal.fire({
        title: "Xatolik",
        text: msg,
        icon: "error",
      });

      for (let i = 0; i < e.target.length; i++) {
        e.target[i].removeAttribute("disabled");
      }
    }
    // } else {
    //   Swal.fire({
    //     title: "Xatolik",
    //     text: resultData,
    //     icon: "error",
    //   });
    // }
  };

  return (
    <section className="user-settings auto-container">
      <input type="text" hidden />
      <input type="email" hidden />
      <input type="password" hidden />
      <input type="phone" hidden />
      <form className="user-settings__tab-item" onSubmit={onSubmit}>
        <div className="left">
          <div className="uploadImg">
            <img
              src={user.image || updateUser?.imgFile || defaultAvatar}
              alt="avatar"
            />
            <label htmlFor="imgFile">
              <VscDeviceCamera />
            </label>
            <input
              type="file"
              name="imgFile"
              id="imgFile"
              defaultValue=""
              onChange={inputHandler}
              hidden
            />
          </div>
        </div>
        <div className="right">
          <h1 className="user-settings__title">My profile</h1>
          <div className="user-settings__input-group">
            <div className="user-settings__inputbox">
              <label>First Name</label>
              <input
                className="input-control"
                type="text"
                name="firstName"
                value={updateUser.firstName}
                onChange={inputHandler}
              />
              {/* <span className="warning-text err">
                Please enter your first name.
              </span> */}
            </div>
            <div className="user-settings__inputbox">
              <label>Last Name</label>
              <input
                className="input-control"
                type="text"
                name="lastName"
                value={updateUser.lastName}
                onChange={inputHandler}
              />
              {/* <span className="warning-text">Please enter your last name.</span> */}
            </div>
            <div className="user-settings__inputbox inputbox_50">
              <label>Phone</label>
              <input
                className="input-control"
                type="text"
                name="phone"
                value={updateUser.phone}
                onChange={inputHandler}
              />
              {/* <span className="warning-text">
                Please enter your phone number.
              </span> */}
            </div>
            <div className="user-settings__inputbox inputbox_50">
              <label>Email</label>
              <input
                className="input-control"
                type="email"
                name="email"
                value={updateUser.email}
                onChange={inputHandler}
              />
              {/* <span className="warning-text">
                Please enter your email address.
              </span> */}
            </div>
          </div>
          {/* <h1 className="user-settings__title">
            Change Or Recover Your Password:
          </h1>
          <div className="user-settings__input-group"> 
            <div className="user-settings__inputbox">
              <label>Current Password</label>
              <input
                className="input-control"
                type="password"
                name="currentPassword"
                value={updateUser.currentPassword}
                onChange={inputHandler}
              />
              <span className="warning-text">
                Please enter your current password.
              </span>
            </div>
            <div className="user-settings__inputbox inputbox_50">
              <label>New Password</label>
              <input
                className="input-control"
                type="password"
                name="newPassword"
                value={updateUser.newPassword}
                onChange={inputHandler}
              />
              <span className="warning-text">
                Please enter your new password.
              </span>
            </div>
            <div className="user-settings__inputbox inputbox_50">
              <label>Confirm Password</label>
              <input
                className="input-control"
                type="password"
                name="confirmPassword"
                value={updateUser.confirmPassword}
                onChange={inputHandler}
              />
              <span className="warning-text">
                Please enter your confirm password.
              </span>
            </div>
          </div> */}
          <h1 className="user-settings__title">
            Change Your Theme or Language:
          </h1>
          <div className="user-settings__input-group">
            <div className="user-settings__inputbox">
              <label>Language</label>
              <select
                className="input-control"
                onChange={inputHandler}
                name="lang"
                value={updateUser.lang}
              >
                <option value="en">English</option>
                <option value="ru">Russian</option>
                <option value="uz">Uzbek</option>
              </select>
            </div>
            <div className="user-settings__inputbox">
              <label>Theme</label>
              <input
                hidden
                id="switch-theme"
                className="switch-control"
                type="checkbox"
                checked={theme === "dark" ? true : false}
                onChange={themeHandler}
              />
              <label htmlFor="switch-theme" className="switch-theme">
                <span className="switch-theme__inner"></span>
              </label>
            </div>
          </div>
          <div className="btn-group">
            <button
              type="button"
              onClick={deleteHandler}
              className="btn btn-delete"
            >
              Delete User
            </button>
            <button type="submit" className="btn btn-darkblue">
              Save changes
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
