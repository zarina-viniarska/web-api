import React, { useEffect } from "react";
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
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Navigate } from "react-router-dom";
import { FormControl, InputLabel, SelectChangeEvent } from "@mui/material";


import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { AddCategorySchema } from "../auth/validation";

const theme = createTheme();

const AddCategory = () => {
  const { message } = useTypedSelector((store) => store.UserReducer);
  const { InsertCategory } = useActions();

//   console.log("Register message ", message);

  if (message === "Category is successfully created") {
    return <Navigate to="/dashboard/categories" />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newCategory: any = {
      Name: data.get("name"),
      Description: data.get("description"),
    };
    console.log(newCategory);
    InsertCategory(newCategory);
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
          <Typography component="h1" variant="h5">
            Create a new category
          </Typography>
          <Formik
            initialValues={{
              name: "",
              description: "",
            }}
            validationSchema={AddCategorySchema}
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
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="name"
                      type="name"
                      fullWidth
                      id="name"
                      label="Name"
                    />
                    {errors.name && touched.name ? (
                      <div style={{ color: "#FF0000" }}>{errors.name}</div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="description"
                      label="Description"
                      name="description"
                      type="description"
                    />
                    {errors.description && touched.description ? (
                      <div style={{ color: "#FF0000" }}>{errors.description}</div>
                    ) : null}
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

export default AddCategory;