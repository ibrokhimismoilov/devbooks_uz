import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import SignInImg from "../../assets/images/login.svg";
import InputErrorMessages from "../../components/InputErrorMessages";
import apiClient from "../../services/apiClient";

export default function SignIn({ setLoggedFunc }) {
  const [login, setLogin] = useState(false);

  const [value, setValue] = useState({
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
      const { data } = await apiClient.post("/login", value);
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("docs", JSON.stringify(data.docs));
        setLoggedFunc(true); // from props
        setLogin(true);
      } else {
        const msg = handleErrorObject(data?.msg);
        setLogin(false);
        setErrors(msg);
      }
    } catch (err) {
      console.log("login Error", err.response);
      // setLogin(false);
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

  if (login) {
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
            <InputErrorMessages type="email" errorObj={errors} />
          </div>

          <div className="auth__form-inputbox">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={value.password}
              onChange={inputHandler}
            />
            <InputErrorMessages type="password" errorObj={errors} />
          </div>

          <button className="auth__form-btn">Next step</button>
        </div>
      </form>
    </div>
  );
}
