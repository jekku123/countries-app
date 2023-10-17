import {
  Avatar,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material"

import { useState } from "react"
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth"
import { auth } from "../firebase-config"

export default function Profile() {
  const [user] = useAuthState(auth)
  const [photoURL, setPhotoURL] = useState("")
  const [displayName, setDisplayname] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [updateProfile] = useUpdateProfile(auth)

  const updateUser = async () => {
    const success = await updateProfile({ displayName, photoURL })
    if (success) {
      alert("Updated profile")
    } else {
      alert("Error updating profile")
    }
    setIsEdit(false)
  }

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          mt: "20px",
          p: "20px 30px 30px 30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Profile
        </Typography>
        {!isEdit ? (
          <>
            <Avatar
              alt="Avatar"
              src={user?.photoURL ?? ""}
              sx={{
                width: "150px",
                height: "150px",
                m: 2,
              }}
            />
            <Typography component="h2" variant="h5" gutterBottom>
              {user?.displayName}
            </Typography>
            <Typography component="p" variant="body1" gutterBottom>
              {user?.email}
            </Typography>
            <Typography component="p" variant="body1">
              {user?.phoneNumber}
            </Typography>
            <Button
              onClick={() => setIsEdit(true)}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Edit
            </Button>
          </>
        ) : (
          <>
            <TextField
              onChange={(e) => setPhotoURL(e.target.value)}
              label="Photo URL"
              placeholder={user?.photoURL ?? ""}
              variant="outlined"
              sx={{ mt: 2 }}
            />
            <TextField
              onChange={(e) => setDisplayname(e.target.value)}
              label="Display name"
              placeholder={user?.displayName ?? ""}
              variant="outlined"
              sx={{ mt: 2 }}
            />
            <Stack direction="row" alignItems="center" spacing={2} mt="20px">
              <Button
                onClick={updateUser}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Save
              </Button>
              <Button
                onClick={() => setIsEdit(false)}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Cancel
              </Button>
            </Stack>
          </>
        )}
      </Paper>
    </Container>
  )
}
