import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import SignInImg from "../../assets/images/login.svg";
import apiClient from "../../services/apiClient";
import { updateUserAction } from "../../store/actions/userActions";
export default function SignIn() {
  const [waitResAnimate, setWaitResAnimate] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

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
      setWaitResAnimate(false);
      if (data.success) {
        history.replace("/");
        console.log(data);
        setloginError(null);
        dispatch(updateUserAction({ user: data.user, token: data.token }));
      } else {
        const msg = data?.error;
        setloginError(msg);
        console.log("SIGN-IN => SUCCESS.ERROR", msg);
      }
      for (let i = 0; i < e.target.length; i++) {
        e.target[i].removeAttribute("disabled");
      }
    } catch (err) {
      const msg = err.response?.data?.msg || err.response?.data?.error;
      console.log("SIGN-IN => catch(err)", msg);
      setloginError(msg);
      setWaitResAnimate(false);
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
