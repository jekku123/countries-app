import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material"
import { useSignOut } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase-config"

interface LogoutDialogProps {
  readonly open: boolean
  readonly setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LogoutDialog({ open, setOpen }: LogoutDialogProps) {
  const [signOut] = useSignOut(auth)
  const navigate = useNavigate()

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <DialogContentText>Are you sure you want to logout?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false)
            signOut()
            navigate(0)
          }}
        >
          Yes
        </Button>
        <Button onClick={() => setOpen(false)} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}
