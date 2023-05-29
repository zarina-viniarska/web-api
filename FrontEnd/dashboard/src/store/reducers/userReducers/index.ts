import { UserState, UserActions, UserActionType } from "./types";

const initialState: UserState = {
  allUsers: [],
  loading: false,
  message: "",
  isAuth: false,
  selectedUser: null,
  user: {},
};

const UserReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionType.START_REQUEST:
      return { ...state, loading: true };
    case UserActionType.ALL_USERS_LOADED:
      return { ...state, loading: false, allUsers: action.payload };
    case UserActionType.FINISH_REQUEST:
      return { ...state, loading: false, message: action.payload };
    case UserActionType.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload.decodedToken,
        message: action.payload.message,
      };
    case UserActionType.LOGOUT_USER:
      return {
        allUsers: [],
        loading: false,
        message: "",
        isAuth: false,
        selectedUser: null,
        user: {},
      };
    case UserActionType.SELECT_USER:
      return {
        ...state,
        loading: false,
        selectedUser: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
