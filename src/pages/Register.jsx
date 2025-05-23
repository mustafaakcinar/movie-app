import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import LockIcon from "@mui/icons-material/Lock"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import { Link } from "react-router-dom"
import RegisterForm, { registerSchema } from "../components/RegisterForm"
import { Formik } from "formik"
import { useAuthContext } from "../context/AuthProvider"

const Register = () => {
  const {createUser} = useAuthContext()

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        // rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" color="primary" align="center">
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
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              createUser(values.email,values.password,values.username)
              actions.resetForm()
              actions.setSubmitting(false)
            }}

            //? Component prop'u ile Formumuz harici bir component haline getirilebilir.
            //? bu sayede daha derli toplu bir validayon yapmak mümkün olacaktır.
            //? Ancak Formik props'larını bu component'e geçmek gerekir.
            component={(props) => <RegisterForm {...props} />}
          ></Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link className="linkLogin" to="/login">Do you have an account?</Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Register