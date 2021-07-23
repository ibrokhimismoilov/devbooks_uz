import React, { useState } from "react";

export default function TabSecurity() {
  const [security, setSecurity] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setSecurity((state) => ({ ...state, [name]: value }));
  };


  const onSubmit = e => {
    e.preventDefault();
  }

  return (
    <form className="user-settings__tab-item" onSubmit={onSubmit}>
    <div className="right security-tab">
        <h1 className="user-settings__title">Change Or Recover Your Password:</h1>
        <div className="user-settings__input-group">
          <div className="user-settings__inputbox">
            <label>First Name</label>
            <input
              className="input-control"
              type="email"
              name="email"
              value={security.email}
              onChange={inputHandler}
            />
            <span className="warning-text">Please enter your first name.</span>
          </div>
          <div className="user-settings__inputbox">
            <label>Current Password</label>
            <input
              className="input-control"
              type="password"
              name="currentPassword"
              value={security.currentPassword}
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
              value={security.newPassword}
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
              value={security.confirmPassword}
              onChange={inputHandler}
            />
            <span className="warning-text">
              Please enter your confirm password.
            </span>
          </div>
        </div>
        <button className="btn btn-darkblue">Save changes</button>
      </div>
    </form>
  );
}
