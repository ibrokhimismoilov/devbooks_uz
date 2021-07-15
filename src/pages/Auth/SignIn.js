import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import SignInImg from "../../assets/images/login.svg";
import InputErrorMessages from "../../components/InputErrorMessages";
import apiClient from "../../services/apiClient";

export default function SignIn({ setLoggedFunc }) {
  const [login, setLogin] = useState(false);
  const [waitResAnimate, setWaitResAnimate] = useState(false)

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [loginError, setloginError] = useState(null);

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
      const { data } = await apiClient.post("/login", value);
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("docs", JSON.stringify(data.docs));
        setLoggedFunc(true); // from props
        setLogin(true);
        setloginError(null);
        setWaitResAnimate(false);
      } else {
        console.log(data);
        setLogin(false);
        const msg = data?.msg;
        setloginError(msg);
        setWaitResAnimate(false);
        for (let i = 0; i < e.target.length; i++) {
          e.target[i].removeAttribute("disabled");
        }
      }
    } catch (err) {
      console.log("login Error", err.response);
      setLogin(false);
      const msg = err.response?.data?.msg || err.response?.data?.error;
      setloginError(msg);
      setWaitResAnimate(false);
      for (let i = 0; i < e.target.length; i++) {
        e.target[i].removeAttribute("disabled");
      }
    }
  };

  if (login) {
    return <Redirect to="/" />;
  }

  let waitAnimate = null;
    if (waitResAnimate) {
      waitAnimate = (
        <div className="linear-activity">
          <div className="indeterminate"></div>
        </div>
      );
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
              // required
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
          {waitAnimate}
          {loginError && <span className="error-msg">{loginError}</span>}
          
          <button className="auth__form-btn">Next step</button>
        </div>
      </form>
    </div>
  );
}
