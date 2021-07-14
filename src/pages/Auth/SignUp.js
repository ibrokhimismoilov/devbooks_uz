import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import SignUpImg from "../../assets/images//register.svg";

export default function SignIn({ setLoggedFunc }) {
  const [register, setRegister] = useState(false);

  const [value, setValue] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("token", JSON.stringify(value));
    setRegister(true);
    setLoggedFunc(true);
  };

  if (register) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth">
      <div className="auth__img">
        <img src={SignUpImg} alt="signIn" />
      </div>
      <form className="auth__form" onSubmit={submitHandler}>
        <div className="auth__form-inner">
          <h1 className="auth__form-title">Sign up</h1>
          <p className="auth__form-desc">
            Already have an account?
            <Link to="/sign-in" className="link">
              {" "}
              Sign in
            </Link>
          </p>
          <div className="auth__form-inputbox">
            <input
              type="firstname"
              placeholder="Firstname"
              name="firstname"
              value={value.firstname}
              onChange={inputHandler}
              required
            />
          </div>
          <div className="auth__form-inputbox">
            <input
              type="lastname"
              placeholder="Lastname"
              name="lastname"
              value={value.lastname}
              onChange={inputHandler}
              required
            />
          </div>
          <div className="auth__form-inputbox">
            <input
              type="phone"
              placeholder="Phone"
              name="phone"
              value={value.phone}
              onChange={inputHandler}
              required
            />
          </div>
          <div className="auth__form-inputbox">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={value.email}
              onChange={inputHandler}
              required
            />
          </div>
          <div className="auth__form-inputbox">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={value.password}
              onChange={inputHandler}
              required
            />
          </div>

          <button className="auth__form-btn">Next step</button>
        </div>
      </form>
    </div>
  );
}
