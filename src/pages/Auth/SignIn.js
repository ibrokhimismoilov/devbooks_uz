import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import SignInImg from "../../assets/images/login.svg";

export default function SignIn({ setLoggedFunc }) {

  const register = localStorage.getItem("token") ? true : false;
 
  const [login, setLogin] = useState(!register);

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (register) {
      const token = JSON.parse(localStorage.getItem("token"));
      if (value.email === token.email && value.password === token.password) {
        setLoggedFunc(true); // from props
        setLogin(true);
      } else {
        alert("Parol yoki login xato!");
        setLogin(false);
      }
    } else {
      alert("Parol yoki login xato! \nToken yo'q!");
    }
  };

  if (!login && !register) {
    console.log("register", login, register);
    return <Redirect to="/sign-up" />;
  }

  if (login && register) {
    console.log("home", login, register);
    return <Redirect to="/" />;
  }

  return (
    <div className="auth">
      <div className="auth__img">
        <img src={SignInImg} alt="signIn" />
      </div>
      <form className="auth__form" onSubmit={submitHandler}>
        <div className="auth__form-inner">
          <h1 className="auth__form-title">Sign in</h1>

          <p className="auth__form-desc">
            Do not you have an account?
            <Link to="/sign-up" className="link">
              {" "}
              Sign up
            </Link>
          </p>

          <div className="auth__form-inputbox">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={value.email}
              onChange={inputHandler}
            />
          </div>

          <div className="auth__form-inputbox">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={value.password}
              onChange={inputHandler}
            />
          </div>

          <button className="auth__form-btn">Next step</button>
        </div>
      </form>
    </div>
  );
}
