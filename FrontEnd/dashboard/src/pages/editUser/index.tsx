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
import { toast } from "react-toastify";

import { Navigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useActions } from "../../hooks/useActions";
import { EditSchema } from "../auth/validation";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Paper from "@mui/material/Paper";

const theme = createTheme();

const initialEditValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const EditUser = () => {
  const [isRedirect, setIsRedirect] = useState(false);
  const selectedUser = JSON.parse(
    window.localStorage.getItem("selectedUser") || "{}"
  );

  const { user, message } = useTypedSelector((store) => store.UserReducer);

  const [role, setRole] = useState(selectedUser.role);

  initialEditValues.firstName = selectedUser.name;
  initialEditValues.lastName = selectedUser.surname;
  initialEditValues.email = selectedUser.email;
  initialEditValues.phoneNumber = selectedUser.phoneNumber;

  const { EditUser, DeleteUser, BlockUser, UnblockUser } = useActions();

  if (message === "User is successfully edited" || message === "User is successfully blocked" || message === "User is successfully unblocked" || message === "User is successfully deleted") {
    return <Navigate to="/dashboard/users" />;
  }

  const handleClickBlock = (selectedUser: any) => {
    if (selectedUser.id == user.Id) {
      toast.error("You can't block your account");
    } else {
      BlockUser(selectedUser.id);
      setIsRedirect(true);
    }
  };

  const handleClickUnblock = (selectedUser: any) => {
    UnblockUser(selectedUser.id);
    setIsRedirect(true);
  };

  const handleClickDelete = (selectedUser: any) => {
    if (selectedUser.id == user.Id) {
      toast.error("You can't delete your account");
    } else {
      console.log(selectedUser.id);
      DeleteUser(selectedUser.id);
      setIsRedirect(true);
    }
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newUser: any = {
      Id: selectedUser.id,
      Name: data.get("firstName"),
      Surname: data.get("lastName"),
      Email: data.get("email"),
      PhoneNumber: data.get("phoneNumber"),
      Role: role,
    };

    EditUser(newUser);
    setIsRedirect(true);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Container component={Paper}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                Edit
              </Typography>
              <Formik
                initialValues={initialEditValues}
                validationSchema={EditSchema}
                onSubmit={() => {}}
              >
                {({ errors, touched, isSubmitting, isValid, dirty }) => (
                  <Box
                    component="form"
                    onSubmit={handleEditSubmit}
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
                          <div style={{ color: "#FF0000" }}>
                            {errors.firstName}
                          </div>
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
                          <div style={{ color: "#FF0000" }}>
                            {errors.lastName}
                          </div>
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
                      >
                        {isSubmitting ? "Loading" : "Save changes"}
                      </Button>
                    </Box>
                  </Box>
                )}
              </Formik>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ mt: 2, width: "100%" }}>
            <Card>
              <Box style={{ width: "100%" }} sx={{ mt: 1 }}>
                <CardHeader
                  sx={{ color: "red" }}
                  subheader={"Block or delete user"}
                  title="Danger zone"
                ></CardHeader>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <Box display="flex" justifyContent="flex-end">
                        {(!selectedUser.isLocked && (
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => handleClickBlock(selectedUser)}
                            sx={{ minWidth: "100px" }}
                          >
                            Block
                          </Button>
                        )) || (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleClickUnblock(selectedUser)}
                            sx={{ minWidth: "100px" }}
                          >
                            Unblock
                          </Button>
                        )}
                      </Box>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleClickDelete(selectedUser)}
                        sx={{ minWidth: "100px" }}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default EditUser;