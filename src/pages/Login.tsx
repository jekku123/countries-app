/* eslint-disable react-hooks/exhaustive-deps */
import { Google } from "@mui/icons-material"
import {
  Box,
  Button,
  Container,
  ContainerProps,
  Divider,
  Link,
  Paper,
  PaperProps,
  Typography,
  styled,
} from "@mui/material"
import { useEffect } from "react"
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { auth } from "../auth/firebase"
import { useForm } from "../hooks/useForm"
import FormFields from "./FormFields"

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  padding: "30px",
  margin: "30px",
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
}))

const initState = {
  email: "",
  password: "",
}

export default function Login() {
  const { formState, handleFormChanges } = useForm(initState)

  const [user, loading] = useAuthState(auth)

  const [signInWithGoogle, , googleLoading, googleError] =
    useSignInWithGoogle(auth)
  const [signInWithEmailAndPassword, , signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate("/countries")
  }, [user, loading])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = formState
    if (!email || !password) return
    await signInWithEmailAndPassword(email, password)
  }

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h5" component="h2" align="center">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormFields {...{ formState, handleFormChanges }} />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: "20px" }}
            disabled={signInLoading || googleLoading}
          >
            Sign in
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
          onClick={() => signInWithGoogle()}
          startIcon={<Google />}
          variant="contained"
          disabled={signInLoading || googleLoading}
          fullWidth
        >
          Sign in with Google
        </Button>
      </StyledPaper>

      <Typography variant="body2" color="error" component="p">
        {signInError && signInError.code}
        {googleError && googleError.code}
      </Typography>

      <Typography variant="body1" component="p">
        No account?{" "}
        <Link component={RouterLink} to="/register">
          Register{" "}
        </Link>
        now
      </Typography>
    </StyledContainer>
  )
}
