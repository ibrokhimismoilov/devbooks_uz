import React, { useState } from "react";
import { VscDeviceCamera } from "react-icons/vsc";
import defaultAvatar from "../../assets/images/avatar.svg";

export default function TabProfile() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    imgFile: defaultAvatar,
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "imgFile") {
      if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          setProfileData((state) => ({ ...state, [name]: e.target.result }));
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setProfileData((state) => ({ ...state, [name]: value }));
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="user-settings__tab-item" onSubmit={onSubmit}>
      <div className="left">
        <div className="uploadImg">
          <img
            src={profileData.imgFile ? profileData.imgFile : defaultAvatar}
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
              value={profileData.firstName}
              onChange={inputHandler}
            />
            <span className="warning-text err">
              Please enter your first name.
            </span>
          </div>
          <div className="user-settings__inputbox">
            <label>Last Name</label>
            <input
              className="input-control"
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={inputHandler}
            />
            <span className="warning-text">Please enter your last name.</span>
          </div>
          <div className="user-settings__inputbox inputbox_50">
            <label>Phone</label>
            <input
              className="input-control"
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={inputHandler}
            />
            <span className="warning-text">
              Please enter your phone number.
            </span>
          </div>
          <div className="user-settings__inputbox inputbox_50">
            <label>Email</label>
            <input
              className="input-control"
              type="email"
              name="email"
              value={profileData.email}
              onChange={inputHandler}
            />
            <span className="warning-text">
              Please enter your email address.
            </span>
          </div>
        </div>
        <button className="btn btn-darkblue">Save changes</button>
      </div>
    </form>
  );
}
