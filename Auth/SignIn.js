import React, { useCallback, useEffect, useState, useMemo, useRef, useContext } from 'react';
import { useHistory, useLocation, useParams, Link, Prompt } from 'react-router-dom';
import { StyledButton, StyledInput } from '../../style/UI';
import StyledSignIn from '../../style/auth';
import columnImage from '../../assets/images/auth/login.svg';
import Axios from '../../utils/axios';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/all';
import GlobalContext from '../../context/GlobalContext';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAction } from '../../store/actions/userActions';

export default function SignIn(props) {
  const context = useContext(GlobalContext);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [state, setState] = useState({
    email: 'aka@mail.ru',
    password: '123456',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();
  const emailRef = useRef();
  const [visible, setVisible] = useState(false);

  const handleInputChange = useCallback(e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...state, [name]: value }));

  }, [state]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/login', state);
      if (!data.success) {
        return setErrorMsg(data.msg);
      }
      // Store user data and redirect
      const { token, user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(updateUserAction({ user, token }));
      context.setAuthDetails(data);
    }
    catch (err) {
      console.log(err.response);
    }
  }

  return (
    <StyledSignIn>
      <div className="col-left">
        <img src={columnImage} alt="login page" />
      </div>
      <div className="col-right">
        <h2>Sign In</h2>
        <p>Do not you have an account? <Link to="/sign-up">Sign up</Link> </p>

        <form onSubmit={handleSignIn} className="form" autoComplete="off">
          <StyledInput type="email" hidden name="email" />
          <StyledInput type="password" hidden name="password" />

          <div className="form__input-wrapper">
            <StyledInput
              type="text"
              name="email"
              value={state.email}
              ref={emailRef}
              onChange={handleInputChange}
              placeholder="Your email"
              autoComplete="new-email"
            />
          </div>
          <div className="form__input-wrapper">
            <StyledInput
              type={visible ? 'text' : 'password'}
              name="password"
              value={state.password}
              onChange={handleInputChange}
              placeholder="Your password"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="password-visible"
              onClick={() => setVisible(state => !state)}
            >
              {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          <div className="form__input-wrapper justify-center d-flex">
            <StyledButton
              className="main w-100"
              type="submit"
              size="lg"
            >
              Log in
            </StyledButton>
          </div>
        </form>
      </div>
    </StyledSignIn>
  )
}
