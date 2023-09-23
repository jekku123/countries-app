import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Link,
  Paper,
  PaperProps,
  Typography,
  styled,
} from "@mui/material"
import { useEffect } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import useFirebaseAuth from "../hooks/useFirebaseAuth"
import { useForm } from "../hooks/useForm"

const FormPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
  marginTop: "30px",
  marginBottom: "30px",
  maxWidth: "400px",
  background: theme.palette.background.default,
}))

const initState = {
  email: "",
  password: "",
}

export default function Login() {
  const navigate = useNavigate()
  const { formState, handleFormChanges } = useForm(initState)
  const { user, loading, signInWithEmailAndPassword, signInWithGoogle } =
    useFirebaseAuth()

  useEffect(() => {
    if (loading) return
    if (user) navigate("/countries")
  }, [user, loading])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signInWithEmailAndPassword(formState.email, formState.password)
  }

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FormPaper elevation={3}>
        <Typography variant="h5" component="h2">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl margin="normal" variant="standard" fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              onChange={handleFormChanges}
              value={formState.email}
              autoFocus
              inputProps={{
                form: {
                  autoComplete: "off",
                },
              }}
            />
          </FormControl>
          <FormControl margin="normal" variant="standard" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={handleFormChanges}
              value={formState.password}
              inputProps={{
                autoComplete: "new-password",
              }}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: "20px" }}
          >
            Login
          </Button>
        </form>
        <Button
          onClick={() => signInWithGoogle()}
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: "20px" }}
        >
          Sign in with Google
        </Button>
      </FormPaper>
      <Link component={RouterLink} to="/register">
        No account? Register here
      </Link>
    </Container>
  )
}
