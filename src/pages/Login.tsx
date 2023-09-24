/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Container,
  Link,
  Paper,
  PaperProps,
  Typography,
  styled,
} from "@mui/material"
import { useEffect } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import GenerateFormFields from "../components/GenerateFormFields"
import useFirebaseAuth from "../hooks/useFirebaseAuth"
import { useForm } from "../hooks/useForm"

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
  marginTop: "30px",
  marginBottom: "30px",
  maxWidth: "400px",
  background: theme.palette.background.default,
  elevation: 3,
}))

const initState = {
  email: "",
  password: "",
}

export default function Login() {
  const navigate = useNavigate()
  const { formState, handleFormChanges } = useForm(initState)
  const {
    user,
    loading,
    signInWithEmailAndPassword,
    signInWithGoogle,
    signInLoading,
    signInError,
  } = useFirebaseAuth()

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
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <StyledPaper elevation={3}>
        <Typography variant="h5" component="h2">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <GenerateFormFields {...{ formState, handleFormChanges }} />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: "20px" }}
            disabled={signInLoading}
          >
            Login
          </Button>
        </form>
        <Button
          onClick={() => signInWithGoogle()}
          variant="contained"
          fullWidth
          sx={{ marginTop: "20px" }}
        >
          Sign in with Google
        </Button>
      </StyledPaper>
      <Link component={RouterLink} to="/register">
        No account? Register here
      </Link>
      {signInError && <p>{signInError.code}</p>}
    </Container>
  )
}
