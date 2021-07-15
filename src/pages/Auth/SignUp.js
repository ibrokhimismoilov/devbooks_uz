import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import InputErrorMessages from "../../components/InputErrorMessages";
import SignUpImg from "../../assets/images/register.svg";
import apiClient from "../../services/apiClient";

export default function SignIn({ setLoggedFunc }) {
  const [register, setRegister] = useState(false);

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

    try {
      const { data } = await apiClient.post("/sign-up", value);
      if (data.success) {
        localStorage.setItem("token", data.token);
        setRegister(true);
        setLoggedFunc(true);
      } else {
        const msg = handleErrorObject(data?.msg);
        setErrors(msg);
      }
    } catch (err) {
      console.log("Register error", err.response);
      const msg = handleErrorObject(err.response?.data?.msg);
      setErrors(msg);
    }
  };

  const handleErrorObject = (errorMsg = "") => {
    if (errorMsg.includes("E11000")) {
      return {
        type: "email",
        message: "This user exist. Choose another email!",
      };
    }
    const errorType = errorMsg.slice(
      errorMsg.indexOf('"'),
      errorMsg.lastIndexOf('"')
    );
    return {
      type: errorType.replace('"', "").replace("\\", ""),
      message: errorMsg,
    };
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
            Already have an account?{" "}
            <Link to="/sign-in" className="link">
              Sign in
            </Link>
          </p>
          <InputErrorMessages type="firstName" errorObj={errors} />
          <div className="auth__form-inputbox">
            <input
              type="firstName"
              placeholder="FirstName"
              name="firstName"
              value={value.firstName}
              onChange={inputHandler}
              required
            />
          </div>
          <InputErrorMessages type="lastName" errorObj={errors} />
          <div className="auth__form-inputbox">
            <input
              type="lastName"
              placeholder="LastName"
              name="lastName"
              value={value.lastName}
              onChange={inputHandler}
              required
            />
          </div>
          <InputErrorMessages type="phone" errorObj={errors} />
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
          <InputErrorMessages type="email" errorObj={errors} />

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
          <InputErrorMessages type="password" errorObj={errors} />
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
