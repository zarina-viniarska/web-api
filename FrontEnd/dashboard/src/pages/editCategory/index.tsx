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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
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
import { AddCategorySchema } from "../auth/validation";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Paper from "@mui/material/Paper";

const theme = createTheme();

const initialEditValues = {
  name: "",
  description: "",
};

const EditCategory = () => {
  const selectedCategory = JSON.parse(
    window.localStorage.getItem("selectedCategory") || "{}"
  );

  const { message, coursesInCategory } = useTypedSelector(
    (store) => store.CategoryReducer
  );

  initialEditValues.name = selectedCategory.name;
  initialEditValues.description = selectedCategory.description;

  const { UpdateCategory, DeleteCategory } = useActions();

  if (
    message === "Category is successfully updated" ||
    message === "Category is successfully deleted"
  ) {
    return <Navigate to="/dashboard/categories" />;
  }

  const handleClickDelete = (selectedCategory: any) => {
    DeleteCategory(selectedCategory.id);
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newCategory: any = {
      Id: selectedCategory.id,
      Name: data.get("name"),
      Description: data.get("description"),
    };
    console.log(newCategory);
    UpdateCategory(newCategory);
  };

  const handleCourseButtonClick = (selectedCourse: any) => {
    window.localStorage.setItem("selectedCourse", JSON.stringify(selectedCourse));
  }

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
                validationSchema={AddCategorySchema}
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
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="name"
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
                        />
                        {errors.description && touched.description ? (
                          <div style={{ color: "#FF0000" }}>
                            {errors.description}
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
                  subheader={"Delete category"}
                  title="Danger zone"
                ></CardHeader>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleClickDelete(selectedCategory)}
                        sx={{ minWidth: "100px" }}
                      >
                        Delete
                      </Button>
                    </Grid>
                    </Grid>
                    {coursesInCategory.length !== 0 && (
                      <Box>
                        <Typography variant="h6" sx={{ mt: 2, mb: 2, color: "red" }}>
                          Courses in this category
                        </Typography>
                      <List>
                        {coursesInCategory.map((course: any) => {
                          return (
                            <ListItem disablePadding>
                              <ListItemButton component="a" href="/dashboard/edit-course" onClick={() => handleCourseButtonClick(course)}>                
                                <ListItemText primary={course.title} />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
                      </Box>
                    )}
                </CardContent>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default EditCategory;
