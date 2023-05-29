export interface CourseState {
    allCourses: any,
    loading: boolean,
    message: string,
    selectedCourse: any;
}

export enum CourseActionType{
    START_REQUEST = "START_REQUEST",
    ALL_COURSES_LOADED = "ALL_COURSES_LOADED",
    FINISH_REQUEST = "FINISH_REQUEST",
}

interface StartRequestAction{
    type: CourseActionType.START_REQUEST;
}

interface AllCoursesLoaded{
    type: CourseActionType.ALL_COURSES_LOADED;
    payload: any;
}

interface FinishRequestAction{
    type: CourseActionType.FINISH_REQUEST;
    payload: any;
}

export type CourseActions = StartRequestAction | AllCoursesLoaded | FinishRequestAction;