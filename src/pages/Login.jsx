import { Avatar, Container, Grid, Typography } from "@mui/material";
import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import { useAuthContext } from "../context/AuthProvider";

const Login = () => {

  const {userSignIn, forgotPassword, googleProvider} = useAuthContext()


  const loginSchema = object({
    password: string()
      .required("Şifre Zorunludur")
      .min(8, "Şifre en az 8 karakter olmalı")
      .max(16, "Şifre en fazla 16 karakter içermelidir")
      .matches(/[a-z]+/, "Şifre en az bir küçük harf içermelidir")
      .matches(/[A-Z]+/, "Şifre en az bir küçük harf içermelidir")
      .matches(
        /[@$!%*?&]+/,
        "Şifre en az bir özel karakter (@$!%*?&) içermelidir"
      ),

      email: string().email("Lütfen geçerli email giriniz").required()
  });


  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h4" color="white" align="center">
            POSEIDON MOVIE AND SERIES
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, actions) => {
              userSignIn(values.email,values.password)
              actions.resetForm();
              actions.setSubmitting(false); //? isSubmitting (Boolean)
            }}
          >
            {({
              isSubmitting,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
            }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    onBlur={handleBlur}
                    helperText={errors.email}
                    sx={{backgroundColor:"#1565C0","& label": { color: "white" }}}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={errors.password}
                    sx={{backgroundColor:"#1565C0","& label": { color: "white" }}}
                  />
                  
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor:"#1659B7"
                    }}
                  >
                    Sing In
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={googleProvider}
                    sx={{
                      backgroundColor:"#1659B7"
                    }}
                  >
                    Continue with Google 
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{
            display:"flex",
            justifyContent:"center",
          }}>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link className="linkLogin" to="/register">Do you have not an account?</Link>
          </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
