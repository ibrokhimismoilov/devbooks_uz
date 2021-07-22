import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
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

  return (
    <form className="user-settings__tab-item row">
      <div className="left col-md-3">
        <img
          src={profileData.imgFile ? profileData.imgFile : defaultAvatar}
          alt="avatar"
        />
        <label htmlFor="imgFile">
          <FaCamera size="36" />
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
      <div className="right col-md-9">
        <h1 className="title">My profile</h1>
        <div className="row">
          <div className="col-md-12">
            <label>First Name</label>
            <input
              className="form-control"
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={inputHandler}
            />
            <span>Please enter your first name.</span>
          </div>
          <div className="col-md-12">
            <label>Last Name</label>
            <input
              className="form-control"
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={inputHandler}
            />
            <span>Please enter your last name.</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Phone</label>
            <input
              className="form-control"
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={inputHandler}
            />
            <span>Please enter your phone number.</span>
          </div>
          <div className="col-md-6">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={profileData.email}
              onChange={inputHandler}
            />
            <span>Please enter your email address.</span>
          </div>
        </div>
      </div>
    </form>
  );
}
