import { Dispatch } from "redux";
import { GetAll, Insert, Update, Delete, removeSelectedCategory } from "../../../services/api-category-service";
import { CategoryActionType, CategoryActions } from "../../reducers/categoryReducers/types";
import { toast } from "react-toastify";

export const GetAllCategories = () => {
    console.log("GetAllCategories action");
    return async (dispatch: Dispatch<CategoryActions>) => {
      try {
        dispatch({ type: CategoryActionType.START_REQUEST });
        const data = await GetAll();
        const { response } = data;
        if (response.success) {
          removeSelectedCategory();
          dispatch({
            type: CategoryActionType.ALL_CATEGORIES_LOADED,
            payload: response.payload,
          });
        }
      } catch {}
    };
  };

export const InsertCategory = (category: any) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionType.START_REQUEST });
      const data = await Insert(category);
      const { response } = data;
      console.log("InsertCategory ", response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: CategoryActionType.FINISH_REQUEST,
        payload: response.message,
        accessToken: response.accessToken,
      });
    } catch {}
  };
}

export const UpdateCategory = (category: any) => {
    return async (dispatch: Dispatch<CategoryActions>) => {
      try {
        dispatch({ type: CategoryActionType.START_REQUEST });
        const data = await Update(category);
        const { response } = data;
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
        dispatch({
          type: CategoryActionType.FINISH_REQUEST,
          payload: response.message,
          accessToken: response.accessToken,
        });
      } catch {}
    };
}

export const DeleteCategory = (id: number) => {
    return async (dispatch: Dispatch<CategoryActions>) => {
      try {
        dispatch({ type: CategoryActionType.START_REQUEST });
        const data = await Delete(id);
        const { response } = data;
        if (response.success) {
          toast.success(response.message);
          dispatch({
            type: CategoryActionType.FINISH_REQUEST,
            payload: response.message,
            accessToken: response.accessToken,
          });
        } else {
          toast.error(response.message);
          dispatch({
            type: CategoryActionType.DELETE_CATEGORY_FAILED,
            payload: response.payload,
          })
        }
      } catch {}
    };
  }

 