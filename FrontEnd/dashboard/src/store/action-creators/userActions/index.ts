import { Dispatch } from "redux";
import { UserActionType, UserActions } from "../../reducers/userReducers/types";
import {
  Edit,
  UpdateProfile,
  GetAll,
  Insert,
  Login,
  Logout,
  ChangePassword,
  removeTokens,
  setAccessToken,
  setRefreshToken,
  Delete,
  Block,
  Unblock,
  Select,
  setSelectedUser,
  removeSelectedUser,
} from "../../../services/api-user-service";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

export const InsertUser = (user: any) => {
  console.log("Input data (insert): ", user);
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Insert(user);
      const { response } = data;
      console.log("InsertUser ", response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
        accessToken: response.accessToken,
      });
    } catch {}
  };
};

export const LoginUser = (user: any) => {
  console.log("Input data (login): ", user);
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Login(user);
      const { response } = data;

      if (response.success) {
        const { accessToken, refreshToken, message } = data.response;
        removeTokens();
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        toast.success(response.message);
        AuthUser(accessToken, message, dispatch);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  };
};

export const LogoutUser = (id: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try{
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Logout(id);
      const {response} = data;
      if(response.success) {
        removeTokens();
        toast.success(response.message);
        dispatch({
          type: UserActionType.LOGOUT_USER,
        });
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  }
}

export const GetAllUsers = () => {
  console.log("GetAllUsers action");
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await GetAll();
      const { response } = data;
      if (response.success) {
        removeSelectedUser();
        dispatch({
          type: UserActionType.ALL_USERS_LOADED,
          payload: response.payload,
        });
      }
    } catch {}
  };
};

export const AuthUser = (
  token: string,
  message: string,
  dispatch: Dispatch<UserActions>
) => {
  const decodedToken = jwtDecode(token) as any;
  dispatch({
    type: UserActionType.LOGIN_USER_SUCCESS,
    payload: {
      message,
      decodedToken,
    },
  });
};

export const EditUser = (user: any) => {
  console.log("EditUser Action");
  return async (dispatch: Dispatch<UserActions>) => {
    try{
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Edit(user);
      const {response} = data;
      if(response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  }
}

export const UpdateUserProfile = (user: any) => {
  console.log("UpdateUserProfile Action");
  return async (dispatch: Dispatch<UserActions>) => {
    try{
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await UpdateProfile(user);
      const {response} = data;
      if(response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  }
}

export const ChangeUserPassword = (user: any) => {
  console.log("ChangePassword Action");
  return async (dispatch: Dispatch<UserActions>) => {
    try{
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await ChangePassword(user);
      const {response} = data;
      if(response.success) {
        toast.success(response.message);
      } else {
        console.log("error");
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  }
}

export const SelectUser = (id: string | number) => {
  console.log("SelectUser Action");
  return async (dispatch: Dispatch<UserActions>) => {
    try{
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Select(id);
      const { response } = data;
      if(response.success){
        toast.success(response.message);
        setSelectedUser(response.payload);
        dispatch({
          type: UserActionType.SELECT_USER,
          payload: response.payload,
        });
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });      
    } catch {}
  }
}

export const DeleteUser = (id: string) => {
  console.log("DeleteUser Action");
  return async (dispatch: Dispatch<UserActions>) => {
    try{
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Delete(id);
      const {response} = data;
      if(response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  }
}

export const BlockUser = (id: string) => {
  console.log("BlockUser Action");
  return async (dispatch: Dispatch<UserActions>) => {
    try{
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Block(id);
      const {response} = data;
      if(response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  }
}

export const UnblockUser = (id: string) => {
  console.log("UnblockUser Action");
  return async (dispatch: Dispatch<UserActions>) => {
    try{
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Unblock(id);
      const {response} = data;
      if(response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  }
}