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
import useFirestore from "../hooks/useFirestore"
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
}))

const initState = {
  username: "",
  email: "",
  password: "",
}

export default function Register() {
  const { formState, handleFormChanges } = useForm(initState)

  const { user, loading, createUserWithNameEmailAndPassword } =
    useFirebaseAuth()

  const { addUserToDatabase } = useFirestore()

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate("/countries")
  }, [user, loading])

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formState.username) return alert("Please enter your username")
    const newUser = await createUserWithNameEmailAndPassword(
      formState.username,
      formState.email,
      formState.password,
    )
    addUserToDatabase(newUser, {
      username: formState.username,
      email: formState.email,
    })
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
          Sign Up
        </Typography>
        <form onSubmit={handleRegistration}>
          <FormControl margin="normal" variant="standard" fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              name="username"
              onChange={handleFormChanges}
              value={formState.username}
              autoFocus
              inputProps={{
                form: {
                  autoComplete: "off",
                },
              }}
            />
          </FormControl>
          <FormControl margin="normal" variant="standard" fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              onChange={handleFormChanges}
              value={formState.email}
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
            Register
          </Button>
        </form>
      </StyledPaper>
      <Link component={RouterLink} to="/login">
        Already have an account? Login here
      </Link>
    </Container>
  )
}
