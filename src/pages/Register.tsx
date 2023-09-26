/* eslint-disable react-hooks/exhaustive-deps */
import { Google } from "@mui/icons-material"
import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Paper,
  PaperProps,
  Typography,
  styled,
} from "@mui/material"
import { updateProfile } from "firebase/auth"
import { useEffect } from "react"
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { auth } from "../auth/firebase"
import { setUserToDatabase } from "../firestore/db"
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

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}))

const initState = {
  name: "",
  email: "",
  password: "",
}

export default function Register() {
  const { formState, handleFormChanges } = useForm(initState)

  const [user, loading] = useAuthState(auth)

  const [createUserWithEmailAndPassword, , signUpLoading, signUpError] =
    useCreateUserWithEmailAndPassword(auth)
  const [signInWithGoogle, , googleLoading, googleError] =
    useSignInWithGoogle(auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate("/countries")
  }, [user, loading])

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, password } = formState
    if (!name || !email || !password) return
    const userData = await createUserWithEmailAndPassword(email, password)
    if (!userData) return
    await updateProfile(userData.user, {
      displayName: name,
    })
    setUserToDatabase(userData.user, {
      name,
      email,
    })
  }

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h5" component="h2" align="center">
          Signup
        </Typography>
        <form onSubmit={handleRegistration}>
          <FormFields {...{ formState, handleFormChanges }} />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: "20px" }}
            disabled={signUpLoading || googleLoading}
          >
            Signup
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
          disabled={signUpLoading || googleLoading}
          fullWidth
        >
          Signup with Google
        </Button>
      </StyledPaper>
      <Typography variant="body1" component="p">
        Already have an account?{" "}
        <Link component={RouterLink} to="/login">
          Login
        </Link>
      </Typography>
      <Typography variant="body2" color="error" component="p">
        {signUpError && <p>{signUpError.code}</p>}
        {googleError && <p>{googleError.code}</p>}
      </Typography>
    </StyledContainer>
  )
}
