import {
  CLEAR_USER,
  RESPONSE_ERROR,
  UPDATE_LANGUAGE,
  UPDATE_THEME,
  UPDATE_USER,
} from "../actionTypes";

const initialState = {
  token: null,
  theme: "light",
  user: {
    lang: "uz",
  },
  err: "",
};

const userReducer = (state = initialState, action) => {
  const { user, token } = { ...action?.payload };
  switch (action.type) {
    case RESPONSE_ERROR: {
      return { ...state, err: action.payload };
    }

    case UPDATE_USER: {
      return { ...state, user, token };
    }

    case UPDATE_LANGUAGE: {
      return { ...state, user: { ...state.user, lang: action.payload } };
    }

    case UPDATE_THEME: {
      return { ...state, theme: action.payload };
    }

    case CLEAR_USER:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
