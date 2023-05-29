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
import { AddCourseSchema } from "../auth/validation";

const theme = createTheme();

const AddCourse = () => {
  const { GetAllCategories } = useActions();
  const { message } = useTypedSelector((store) => store.CourseReducer);
  const { allCategories } = useTypedSelector((store) => store.CategoryReducer);
  const { InsertCourse } = useActions();

  useEffect(() => {
    GetAllCategories();
  }, []);

  let categoryId: number = 1;

  if (message === "Course is successfully created") {
    return <Navigate to="/dashboard/courses" />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newCourse: any = {
      Title: data.get("title"),
      Description: data.get("description"),
      Price: parseFloat(data.get("price")?.toString() || "0"),
      CategoryId: categoryId,
    };
    console.log(newCourse);
    InsertCourse(newCourse);
  };

  const handleChange = (event: SelectChangeEvent) => {
    categoryId = parseInt(event.target.value);
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
            Create a new course
          </Typography>
          <Formik
            initialValues={{
              title: "",
              description: "",
              price: 0,
              categoryId: 0,
            }}
            validationSchema={AddCourseSchema}
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
                      name="title"
                      // type="title"
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
                      // type="description"
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

export default AddCourse;
