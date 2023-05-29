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
import { AddCourseSchema } from "../auth/validation";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Paper from "@mui/material/Paper";

const theme = createTheme();

const initialEditValues = {
  title: "",
  description: "",
  price: 0,
};

const EditCourse = () => {
  const selectedCourse = JSON.parse(
    window.localStorage.getItem("selectedCourse") || "{}"
  );

  let categoryId: number = selectedCourse.categoryId;
  const { GetAllCategories } = useActions();
  const { message } = useTypedSelector((store) => store.CourseReducer);
  const { allCategories } = useTypedSelector((store) => store.CategoryReducer);

  useEffect(() => {
    GetAllCategories();
  }, []);

  initialEditValues.title = selectedCourse.title;
  initialEditValues.description = selectedCourse.description;
  initialEditValues.price = selectedCourse.price;

  const { UpdateCourse, DeleteCourse } = useActions();

  if (
    message === "Course is successfully updated" ||
    message === "Course is successfully deleted"
  ) {
    return <Navigate to="/dashboard/courses" />;
  }

  const handleClickDelete = (selectedCourse: any) => {
    DeleteCourse(selectedCourse.id);
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newCourse: any = {
      Id: selectedCourse.id,
      Title: data.get("title"),
      Description: data.get("description"),
      Price: parseFloat(data.get("price")?.toString() || "0"),
      CategoryId: categoryId,
    };
    console.log(newCourse);
    UpdateCourse(newCourse);
    // setIsRedirect(true);
  };

  const handleChange = (event: SelectChangeEvent) => {
    categoryId = parseInt(event.target.value);
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
                validationSchema={AddCourseSchema}
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
                          name="title"
                          fullWidth
                          id="title"
                          label="Title"
                        />
                        {errors.title && touched.title ? (
                          <div style={{ color: "#FF0000" }}>{errors.title}</div>
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
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          id="price"
                          label="Price"
                          name="price"
                          type="number"
                        />
                        {errors.price && touched.price ? (
                          <div style={{ color: "#FF0000" }}>{errors.price}</div>
                        ) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel>Category</InputLabel>
                          <Select
                            defaultValue={categoryId.toString()}
                            label={"_________"}
                            onChange={handleChange}
                          >
                            {allCategories.map((category: any) => {
                              return (
                                <MenuItem value={category.id}>
                                  {category.name}
                                </MenuItem>
                              );
                            })}
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
                  subheader={"Delete course"}
                  title="Danger zone"
                ></CardHeader>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleClickDelete(selectedCourse)}
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

export default EditCourse;
