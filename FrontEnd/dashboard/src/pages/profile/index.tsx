import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Navigate } from "react-router-dom";
import { FormControl, InputLabel, SelectChangeEvent } from "@mui/material";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useActions } from "../../hooks/useActions";
import { EditSchema, ChangePasswordSchema } from "../auth/validation";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { LogoutUser } from "../../store/action-creators/userActions";
import Paper from "@mui/material/Paper";

const theme = createTheme();

const initialProfileValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const UserProfile = () => {
  const { user, message } = useTypedSelector((store) => store.UserReducer);
  const [isRedirect, setIsRedirect] = useState(false);
  const userId = user.Id;

  initialProfileValues.firstName = user.Name;
  initialProfileValues.lastName = user.Surname;
  initialProfileValues.email = user.Email;
  initialProfileValues.phoneNumber = user.PhoneNumber;

  const { UpdateUserProfile, ChangeUserPassword, LogoutUser } = useActions();

  if (isRedirect) {
    return <Navigate to="/" />;
  }

  const handleUpdateProfileSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const updatedUser: any = {
      Id: user.Id,
      Name: data.get("firstName"),
      Surname: data.get("lastName"),
      Email: data.get("email"),
      PhoneNumber: data.get("phoneNumber"),
    };

    UpdateUserProfile(updatedUser);
  };

  const handleChangePasswordSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const changePasswordUser: any = {
      Id: user.Id,
      OldPassword: data.get("oldPassword"),
      Password: data.get("password"),
      ConfirmPassword: data.get("confirmPassword"),
    };

    ChangeUserPassword(changePasswordUser);
    
  };

  if(message === "Password is successfully changed" || message === "User is successfully edited"){
    LogoutUser(userId);
    setIsRedirect(true); 
  } 

  return (
    <ThemeProvider theme={theme}>
      <Container component={Paper} sx={{width: "80%"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
            Profile
          </Typography>
          <Formik
            initialValues={initialProfileValues}
            validationSchema={EditSchema}
            onSubmit={() => {}}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Box
                component="form"
                onSubmit={handleUpdateProfileSubmit}
                noValidate
                sx={{ mt: 1, width: "100%" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      autoComplete="given-name"
                      name="firstName"
                      type="firstName"
                      fullWidth
                      id="firstName"
                      label="First Name"
                    />
                    {errors.firstName && touched.firstName ? (
                      <div style={{ color: "#FF0000" }}>{errors.firstName}</div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      type="lastName"
                      autoComplete="family-name"
                    />
                    {errors.lastName && touched.lastName ? (
                      <div style={{ color: "#FF0000" }}>{errors.lastName}</div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      autoComplete="email"
                    />
                    {errors.email && touched.email ? (
                      <div style={{ color: "#FF0000" }}>{errors.email}</div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      type="phoneNumber"
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <div style={{ color: "#FF0000" }}>
                        {errors.phoneNumber}
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
                <Box
                  mb={2}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!(isValid && dirty)}
                  >
                    {isSubmitting ? "Loading" : "Save changes"}
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </Box>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
            Change Password
          </Typography>
          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={() => {}}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Box
                component="form"
                onSubmit={handleChangePasswordSubmit}
                noValidate
                sx={{ mt: 1, width: "60%" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="oldPassword"
                      type="password"
                      fullWidth
                      id="oldPassword"
                      label="Old Password"
                    />
                    {errors.oldPassword && touched.oldPassword ? (
                      <div style={{ color: "#FF0000" }}>
                        {errors.oldPassword}
                      </div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                    />
                    {errors.password && touched.password ? (
                      <div style={{ color: "#FF0000" }}>{errors.password}</div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="confirmPassword"
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div style={{ color: "#FF0000" }}>
                        {errors.confirmPassword}
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
                <Box
                  mb={2}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!(isValid && dirty)}
                  >
                    {isSubmitting ? "Loading" : "Change Password"}
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserProfile;
