import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import InputErrorMessages from "../../components/InputErrorMessages";
import SignUpImg from "../../assets/images/register.svg";
import apiClient from "../../services/apiClient";
import { useDispatch } from "react-redux";
import { updateUserAction } from "../../store/actions/userActions";
import { handleErrorObject } from "../../utils/handleErrorObject";

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [waitResAnimate, setWaitResAnimate] = useState(false);

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ type: "", message: "" });

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
      const { data } = await apiClient.post("/sign-up", value);
      setWaitResAnimate(false);
      if (data.success) {
        dispatch(updateUserAction({ token: data.token, user: data.user }));
        history.replace("/");
      } else {
        const msg = handleErrorObject(data?.msg);
        setErrors(msg);
      }
      for (let i = 0; i < e.target.length; i++) {
        e.target[i].removeAttribute("disabled");
      }
    } catch (err) {
      console.log("Register error catch =>>", err);
      const msg = handleErrorObject(err.response?.data?.msg);
      setErrors(msg);
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
        <img src={SignUpImg} alt="signIn" />
      </div>
      <form className="auth__form" onSubmit={submitHandler}>
        <div className="auth__form-inner">
          <h1 className="auth__form-title">Sign up</h1>
          <p className="auth__form-desc">
            Already have an account?{" "}
            <Link to="/sign-in" className="link">
              Sign in
            </Link>
          </p>
          <div className="auth__form-inputbox">
            <input
              type="firstName"
              placeholder="FirstName"
              name="firstName"
              value={value.firstName}
              onChange={inputHandler}
              // required
            />
          </div>
          <InputErrorMessages type="firstName" errorObj={errors} />
          <div className="auth__form-inputbox">
            <input
              type="lastName"
              placeholder="LastName"
              name="lastName"
              value={value.lastName}
              onChange={inputHandler}
              // required
            />
          </div>
          <InputErrorMessages type="lastName" errorObj={errors} />
          <div className="auth__form-inputbox">
            <input
              type="phone"
              name="phone"
              value={value.phone}
              onChange={inputHandler}
              placeholder={"+998000000000"}
              // required
            />
          </div>
          <InputErrorMessages type="phone" errorObj={errors} />

          <div className="auth__form-inputbox">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={value.email}
              onChange={inputHandler}
              // required
            />
            <InputErrorMessages type="email" errorObj={errors} />
          </div>
          <div className="auth__form-inputbox">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={value.password}
              onChange={inputHandler}
              // required
            />
          </div>
          <InputErrorMessages type="password" errorObj={errors} />
          {waitAnimate}

          <button className="auth__form-btn">Next step</button>
        </div>
      </form>
    </div>
  );
}
