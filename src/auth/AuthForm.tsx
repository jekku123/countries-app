/* eslint-disable react-hooks/exhaustive-deps */
import { Google } from "@mui/icons-material"
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
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
import { useFormik } from "formik"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { auth } from "../firebase-config"

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
  initialValues,
  onSubmit,
  validationSchema,
  loading,
  error,
}: any) {
  const [signInWithGoogle, , googleLoading] = useSignInWithGoogle(auth)

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    })

  const { pathname } = useLocation()
  const isRegister = pathname === "/register"

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h5" component="h2" align="center">
          {isRegister ? "Sign up" : "Login"}
        </Typography>
        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit()
            }
          }}
        >
          {Object.keys(values).map((fieldname, i) => (
            <FormControl
              key={fieldname}
              margin="normal"
              variant="outlined"
              error={touched[fieldname] && Boolean(errors[fieldname])}
              fullWidth
            >
              <InputLabel
                htmlFor={fieldname}
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
                autoFocus={i === 0 ? true : false}
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
              <FormHelperText>
                <>{touched[fieldname] && errors[fieldname]}</>
              </FormHelperText>
            </FormControl>
          ))}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: "20px" }}
            disabled={loading || googleLoading}
          >
            {isRegister ? "Sign up" : "Login"}
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
          disabled={loading || googleLoading}
          fullWidth
        >
          Login in with Google
        </Button>
      </StyledPaper>

      <Typography variant="body1" component="p">
        {isRegister ? "Already have an account? " : "No account? "}
        <Link component={RouterLink} to={isRegister ? "/login" : "/register"}>
          {isRegister ? "Login" : "Sign up"}
        </Link>
        {!isRegister && " now"}
      </Typography>

      {error && (
        <Typography variant="body1" component="p" color="error" marginTop={1}>
          {error.code}
        </Typography>
      )}

      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || googleLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
