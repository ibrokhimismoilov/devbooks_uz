import { UPDATE_USER } from "../actionTypes";

const initialState = {
  token: null,
  user: {},
};

export const updateUserAction = ({
  user = initialState.user,
  token = initialState.token,
}) => {
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
