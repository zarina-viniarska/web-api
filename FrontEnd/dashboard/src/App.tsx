import React from "react";
import DashboardLayout from "./containers";
import DefaultPage from "./pages/defaultPage";
import Users from "./pages/users";
import ErrorPage from "./pages/errorPage";
import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signUp";
import { Routes, Route } from "react-router-dom";
import { useTypedSelector } from "./hooks/useTypedSelector";
import EditUser from "./pages/editUser";
import UserProfile from "./pages/profile";
import Courses from "./pages/courses";
import AddCourse from "./pages/addCourse";
import AddCategory from "./pages/addCategory";
import EditCategory from "./pages/editCategory";
import Categories from "./pages/categories";
import EditCourse from "./pages/editCourse";

const App: React.FC = () => {
  const { isAuth, user } = useTypedSelector((store) => store.UserReducer);
  return (
    <Routes>
      {isAuth && (
        <>
          {user.role === "Administrators" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="users" element={<Users />} />
              <Route path="edit" element={<EditUser />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="courses" element={<Courses />} />
              <Route path="categories" element={<Categories />} />
              <Route path="add-course" element={<AddCourse />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="edit-category" element={<EditCategory />} />
              <Route path="edit-course" element={<EditCourse />} />
             </Route>
          )}
          {user.role === "Users" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="users" element={<Users />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="courses" element={<Courses />} />
              <Route path="categories" element={<Categories />} />
            </Route>
          )}
        </>
      )}
      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard/" element={<SignIn />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
