import * as actionTypes from '../actionTypes';

export const updateUserAction = ({ user, token }) => {
  return {
    payload: { user, token },
    type: actionTypes.UPDATE_USER,
  }
}

export const clearUserAction = () => {
  return {
    type: actionTypes.CLEAR_USER,
  }
}