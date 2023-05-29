import { yupToFormErrors } from "formik";
import * as Yup from "yup";

const passwordRegExp =
  // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/;
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/;

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Required")
    .label("Email address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Required")
    .matches(
      passwordRegExp,
      "Password must contain A-Z, a-z, 0-9 and special characters."
    )
    .label("Password"),
});

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().max(255).required("Required"),
  lastName: Yup.string().max(255).required("Required"),
  email: Yup.string()
    .max(255)
    .email("Invalid email address.")
    .required("Required")
    .label("Email address"),
  password: Yup.string()
    .max(255)
    .min(6, "Password must be at least 6 characters.")
    .required("Required")
    .matches(
      passwordRegExp,
      "Password must contain A-Z, a-z, 0-9 and special characters."
    )
    .label("Password"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match."),
});

export const EditSchema = Yup.object().shape({
  firstName: Yup.string().max(255).required("Required"),
  lastName: Yup.string().max(255).required("Required"),
  email: Yup.string()
    .max(255)
    .email("Invalid email address.")
    .required("Required")
    .label("Email address"),
  phoneNumber: Yup.string().max(255).required("Required").label("Phone Number"),
});

export const AddCourseSchema = Yup.object().shape({
  title: Yup.string().max(50).required("Required"),
  description: Yup.string().max(255).required("Required"),
  price: Yup.number().required("Required"),
  categoryId: Yup.number().required("Required"),
});

export const AddCategorySchema = Yup.object().shape({
  name: Yup.string().max(50).required("Required"),
  description: Yup.string().max(255).required("Required")
})

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .max(255)
    .min(6, "Password must be at least 6 characters.")
    .matches(
      passwordRegExp,
      "Password must contain A-Z, a-z, 0-9 and special characters."
    )
    .required("Required"),
  password: Yup.string()
    .max(255)
    .min(6, "Password must be at least 6 characters.")
    .required("Required")
    .matches(
      passwordRegExp,
      "Password must contain A-Z, a-z, 0-9 and special characters."
    )
    .notOneOf(
      [Yup.ref("oldPassword")],
      "New password can not match old password."
    ),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match."),
});
