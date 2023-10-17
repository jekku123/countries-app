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

type FormValues = {
  [key: string]: string
}

interface AuthFormProps {
  initialValues: FormValues
  onSubmit: (values: FormValues) => Promise<void>
  validationSchema?: any
  loading: boolean
  error: any
}

export default function AuthForm({
  initialValues,
  onSubmit,
  validationSchema,
  loading,
  error,
}: AuthFormProps) {
  const [signInWithGoogle, , googleLoading] = useSignInWithGoogle(auth)

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    })

  const { pathname } = useLocation()
  const isRegisterPage = pathname === "/register"

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h5" component="h2" align="center">
          {isRegisterPage ? "Sign up" : "Login"}
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
                type={
                  fieldname === "password"
                    ? "password"
                    : fieldname === "email"
                    ? "email"
                    : "text"
                }
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
            {isRegisterPage ? "Sign up" : "Login"}
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
        {isRegisterPage ? "Already have an account? " : "No account? "}
        <Link
          component={RouterLink}
          to={isRegisterPage ? "/login" : "/register"}
        >
          {isRegisterPage ? "Login" : "Sign up"}
        </Link>
        {!isRegisterPage && " now"}
      </Typography>

      {error && (
        <Typography variant="body1" component="p" color="error" marginTop={1}>
          {error.code === "auth/email-already-in-use"
            ? "Email already in use"
            : "Wrong email or password"}
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
