import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material"
import { User } from "firebase/auth"
import { useState } from "react"
import { useSignOut } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase"

export default function UserMenu({ user }: { user: User | null | undefined }) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    setOpen(false)
    signOut()
  }

  const [signOut] = useSignOut(auth)
  const navigate = useNavigate()

  return (
    <>
      <Tooltip title="User settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User" src={user?.photoURL ?? ""} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="user-menu"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        disableScrollLock={true}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {user ? (
          <Box>
            <MenuItem>
              <Typography component="strong">{user.displayName}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography onClick={() => navigate("/profile")}>
                Profile
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography onClick={() => setOpen(true)}>Logout</Typography>
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center" onClick={() => navigate("/login")}>
                Login
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography
                textAlign="center"
                onClick={() => navigate("/register")}
              >
                Sign up
              </Typography>
            </MenuItem>
          </Box>
        )}
      </Menu>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout}>Yes</Button>
          <Button onClick={() => setOpen(false)} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
