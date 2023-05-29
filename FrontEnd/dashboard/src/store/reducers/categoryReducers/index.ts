import { CategoryState, CategoryActions, CategoryActionType } from "./types";

const initialState: CategoryState = {
  allCategories: [],
  loading: false,
  message: "",
  selectedCategory: {},
  coursesInCategory: [],
};

const CategoryReducer = (state = initialState, action: CategoryActions): CategoryState => {
  switch (action.type) {
    case CategoryActionType.START_REQUEST:
      return { ...state, loading: true };
    case CategoryActionType.ALL_CATEGORIES_LOADED:
      return { ...state, loading: false, allCategories: action.payload };
    case CategoryActionType.FINISH_REQUEST:
      return { ...state, loading: false, message: action.payload };
    case CategoryActionType.DELETE_CATEGORY_FAILED:
      return { ...state, loading: false, coursesInCategory: action.payload }
    default:
      return state;
  }
};

export default CategoryReducer;