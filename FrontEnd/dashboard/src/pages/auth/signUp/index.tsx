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
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Navigate } from "react-router-dom";
import { FormControl, InputLabel, SelectChangeEvent } from "@mui/material";


import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { SignUpSchema } from "../validation";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SignUp = () => {
  const [role, setRole] = useState("Users");
  const { message } = useTypedSelector((store) => store.UserReducer);
  const { InsertUser } = useActions();

  console.log("Register message ", message);

  if (message === "User is successfully registered") {
    return <Navigate to="/dashboard/users" />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newUser: any = {
      Name: data.get("firstName"),
      Surname: data.get("lastName"),
      Email: data.get("email"),
      Role: role,
      Password: data.get("password"),
      ConfirmPassword: data.get("confirmPassword"),
    };
    InsertUser(newUser);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon color="primary" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a new user
          </Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={() => {}}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Box
                component="form"
                onSubmit={handleSubmit}
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                    {errors.password && touched.password ? (
                      <div style={{ color: "#FF0000" }}>{errors.password}</div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div style={{ color: "#FF0000" }}>
                        {errors.confirmPassword}
                      </div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={role}
                        defaultValue={role}
                        label={role}
                        onChange={handleChange}
                      >
                        <MenuItem value={"Users"}>Users</MenuItem>
                        <MenuItem value={"Administrators"}>
                          Administrators
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!(isValid && dirty)}
                >
                  {isSubmitting ? "Loading" : "Save"}
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;