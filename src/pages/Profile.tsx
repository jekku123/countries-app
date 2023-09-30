import { Avatar, Box, Container, Typography, styled } from "@mui/material"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase"

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  p: 2,
}))

export default function Profile() {
  const [user] = useAuthState(auth)

  return (
    <Container maxWidth="md">
      <StyledBox>
        <Avatar
          alt="Avatar"
          src={user?.photoURL ?? ""}
          sx={{ width: "150px", height: "150px", m: 2 }}
        />

        <Typography component="h2" variant="h5" gutterBottom>
          {user?.displayName ?? user?.email}
        </Typography>
        <Typography component="p" variant="body1" gutterBottom>
          {user?.email}
        </Typography>
        <Typography component="p" variant="body1">
          {user?.phoneNumber}
        </Typography>
      </StyledBox>
    </Container>
  )
}
