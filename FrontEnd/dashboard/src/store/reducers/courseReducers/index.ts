import { CourseState, CourseActions, CourseActionType } from "./types";

const initialState: CourseState = {
  allCourses: [],
  loading: false,
  message: "",
  selectedCourse: {}
};

const CourseReducer = (state = initialState, action: CourseActions): CourseState => {
  switch (action.type) {
    case CourseActionType.START_REQUEST:
      return { ...state, loading: true };
    case CourseActionType.ALL_COURSES_LOADED:
      return { ...state, loading: false, allCourses: action.payload };
    case CourseActionType.FINISH_REQUEST:
      return { ...state, loading: false, message: action.payload };
    default:
      return state;
  }
};

export default CourseReducer;