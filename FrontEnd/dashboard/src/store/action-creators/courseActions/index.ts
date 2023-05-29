import { Dispatch } from "redux";
import { GetAll, Insert, Update, Delete, removeSelectedCourse } from "../../../services/api-course-service";
import { CourseActionType, CourseActions } from "../../reducers/courseReducers/types";
import { toast } from "react-toastify";

export const GetAllCourses = () => {
    console.log("GetAllCourses action");
    return async (dispatch: Dispatch<CourseActions>) => {
      try {
        dispatch({ type: CourseActionType.START_REQUEST });
        const data = await GetAll();
        const { response } = data;
        if (response.success) {
          removeSelectedCourse();
          dispatch({
            type: CourseActionType.ALL_COURSES_LOADED,
            payload: response.payload,
          });
        }
      } catch {}
    };
  };

export const InsertCourse = (course: any) => {
  return async (dispatch: Dispatch<CourseActions>) => {
    try {
      dispatch({ type: CourseActionType.START_REQUEST });
      const data = await Insert(course);
      const { response } = data;
      console.log("InsertCourse ", response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: CourseActionType.FINISH_REQUEST,
        payload: response.message,
        accessToken: response.accessToken,
      });
    } catch {}
  };
}

export const UpdateCourse = (course: any) => {
  return async (dispatch: Dispatch<CourseActions>) => {
    try {
      dispatch({ type: CourseActionType.START_REQUEST });
      const data = await Update(course);
      const { response } = data;
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: CourseActionType.FINISH_REQUEST,
        payload: response.message,
        accessToken: response.accessToken,
      });
    } catch {}
  };
}

export const DeleteCourse = (id: number) => {
  return async (dispatch: Dispatch<CourseActions>) => {
    try {
      dispatch({ type: CourseActionType.START_REQUEST });
      const data = await Delete(id);
      const { response } = data;
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: CourseActionType.FINISH_REQUEST,
        payload: response.message,
        accessToken: response.accessToken,
      });
    } catch {}
  };
}