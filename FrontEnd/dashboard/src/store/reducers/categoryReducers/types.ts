export interface CategoryState {
    allCategories: any,
    loading: boolean,
    message: string,
    selectedCategory: any,
    coursesInCategory: any,
}

export enum CategoryActionType{
    START_REQUEST = "START_REQUEST",
    ALL_CATEGORIES_LOADED = "ALL_CATEGORIES_LOADED",
    DELETE_CATEGORY_FAILED = "DELETE_CATEGORY_FAILED",
    FINISH_REQUEST = "FINISH_REQUEST",
}

interface StartRequestAction{
    type: CategoryActionType.START_REQUEST;
}

interface AllCategoriesLoaded{
    type: CategoryActionType.ALL_CATEGORIES_LOADED;
    payload: any;
}

interface FinishRequestAction{
    type: CategoryActionType.FINISH_REQUEST;
    payload: any;
}

interface DeleteCategoryFailed{
    type: CategoryActionType.DELETE_CATEGORY_FAILED;
    payload: any;
}

export type CategoryActions = StartRequestAction | AllCategoriesLoaded | FinishRequestAction | DeleteCategoryFailed;