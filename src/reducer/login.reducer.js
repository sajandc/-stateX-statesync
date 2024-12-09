const initialState = {
  username: "",
  password: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_LOGIN":
      return { ...state, username: action.payload.username };
    case "ON_LOGOUT":
      return {
        ...state,
        username: "",
      };
    default:
      return state;
  }
};

export default loginReducer;
