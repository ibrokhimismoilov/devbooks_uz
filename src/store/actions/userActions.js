import {
  CLEAR_USER,
  RESPONSE_ERROR,
  UPDATE_LANGUAGE,
  UPDATE_THEME,
  UPDATE_USER,
} from "../actionTypes";

export const responseErrorAction = (err) => {
  return {
    payload: err,
    type: RESPONSE_ERROR,
  };
};


export const updateUserAction = ({ user, token }) => {
  return {
    payload: { user, token },
    type: UPDATE_USER,
  };
};

export const clearUserAction = () => {
  return {
    type: CLEAR_USER,
  };
};

export const updateLanguage = (lang) => {
  return {
    payload: lang,
    type: UPDATE_LANGUAGE,
  };
};

export const updateTheme = (theme) => {
  return {
    type: UPDATE_THEME,
    payload: theme,
  };
};
