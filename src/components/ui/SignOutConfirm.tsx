import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material"
import { useSignOut } from "react-firebase-hooks/auth"
import { auth } from "../../firebase-config"

export default function SignOutConfirm({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [signOut] = useSignOut(auth)

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
