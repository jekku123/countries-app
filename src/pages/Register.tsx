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
  name: "",
  email: "",
  password: "",
}

export default function Register() {
  const navigate = useNavigate()
  const { addUserToDatabase } = useFirestore()
  const { formState, handleFormChanges } = useForm(initState)
  const {
    user,
    loading,
    createUserWithNameEmailAndPassword,
    signUpError,
    signUpLoading,
  } = useFirebaseAuth()

  useEffect(() => {
    if (loading) return
    if (user) navigate("/countries")
  }, [user, loading])

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, password } = formState
    if (!name || !email || !password) return
    const newUser = await createUserWithNameEmailAndPassword(
      name,
      email,
      password,
    )
    if (!newUser) return
    addUserToDatabase(newUser, {
      name,
      email,
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
          <GenerateFormFields {...{ formState, handleFormChanges }} />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: "20px" }}
            disabled={signUpLoading}
          >
            Register
          </Button>
        </form>
      </StyledPaper>
      <Link component={RouterLink} to="/login">
        Already have an account? Login here
      </Link>
      {signUpError && <p>{signUpError.code}</p>}
    </Container>
  )
}
