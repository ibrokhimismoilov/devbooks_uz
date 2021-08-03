import { CLEAR_USER, UPDATE_USER } from "../actionTypes";

const initialState = {
  token: null,
  user: {},
};

const userReducer = (state = initialState, action) => {
    const {user, token} = {...action?.payload};
    switch (action.type) {
    case UPDATE_USER:
      return { ...state, user, token };
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
