import { UPDATE_LANGUAGE, UPDATE_USER } from "../actionTypes";

export const updateUserAction = ({ user, token }) => {
  return {
    payload: { user, token },
    type: UPDATE_USER,
  };
};

export const clearUserAction = () => {
  return {
    type: UPDATE_USER,
  };
};

export const updateUserLanguage = (lang) => {
  return {
    payload: lang,
    type: UPDATE_LANGUAGE,
  };
};
