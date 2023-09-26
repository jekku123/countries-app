/* eslint-disable react-hooks/exhaustive-deps */
import { Google } from "@mui/icons-material"
import {
  Box,
  Button,
  Container,
  ContainerProps,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  PaperProps,
  Typography,
  styled,
} from "@mui/material"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { auth } from "../../auth/firebase"

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  padding: "30px",
  marginBottom: "20px",
  maxWidth: "350px",
  background: theme.palette.background.default,
}))

const StyledBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
}))

const StyledContainer = styled(Container)<ContainerProps>(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: "30px",
}))

export default function AuthForm({
  signUpLoading,
  signInLoading,
  formik,
  signUpError,
  signInError,
}: any) {
  const { pathname } = useLocation()
  const [signInWithGoogle, , googleLoading] = useSignInWithGoogle(auth)
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    formik

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h5" component="h2" align="center">
          {pathname === "/register" ? "Sign up" : "Login"}
        </Typography>
        <form onSubmit={handleSubmit}>
          {Object.keys(values).map((fieldname, i) => (
            <FormControl
              key={fieldname}
              margin="normal"
              variant="outlined"
              fullWidth
            >
              <InputLabel
                htmlFor={fieldname}
                error={touched && errors && Boolean(errors[fieldname])}
                sx={{
                  textTransform: "capitalize",
                  bgcolor: "background.paper",
                  px: 1,
                }}
              >
                {fieldname}
              </InputLabel>
              <OutlinedInput
                id={fieldname}
                key={fieldname}
                name={fieldname}
                type={fieldname === "password" ? "password" : "text"}
                value={values[fieldname]}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched && errors && Boolean(errors[fieldname])}
                autoFocus={i === 0 ? true : false}
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
              <FormHelperText
                error={touched && errors && Boolean(errors[fieldname])}
              >
                {touched && errors && touched[fieldname] && errors[fieldname]}
              </FormHelperText>
            </FormControl>
          ))}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: "20px" }}
            disabled={signUpLoading || googleLoading || signInLoading}
          >
            {pathname === "/register" ? "Sign up" : "Login"}
          </Button>
        </form>

        <StyledBox my={2}>
          <Divider sx={{ flex: 1 }} />
          <Typography variant="body1" component="p" marginX={2}>
            Or
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </StyledBox>

        <Button
          startIcon={<Google />}
          onClick={() => signInWithGoogle()}
          variant="contained"
          disabled={signUpLoading || googleLoading || signInLoading}
          fullWidth
        >
          Login in with Google
        </Button>
      </StyledPaper>

      {pathname === "/register" && (
        <Typography variant="body1" component="p">
          Already have an account?{" "}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Typography>
      )}
      {pathname === "/login" && (
        <Typography variant="body1" component="p">
          No account?{" "}
          <Link component={RouterLink} to="/register">
            Sign up{" "}
          </Link>
          now
        </Typography>
      )}

      {signUpError && (
        <Typography variant="body1" component="p" color="error" marginTop={1}>
          {signUpError.code}
        </Typography>
      )}
      {signInError && (
        <Typography variant="body1" component="p" color="error">
          Invalid credentials
        </Typography>
      )}
    </StyledContainer>
  )
}

/* <TextField
margin="normal"
variant="outlined"
fullWidth
label="name"
name="name"
type="text"
value={formik.values.name}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
error={formik.touched.name && Boolean(formik.errors.name)}
helperText={formik.touched.name && formik.errors.name}
sx={{ textTransform: "capitalize" }}
autoFocus
inputProps={{
  autoComplete: "new-password",
  form: {
    autoComplete: "off",
  },
}}
/> */
