import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material"
import { User } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SignOutConfirm from "./SignOutConfirm"

export default function UserMenu({ user }: { user: User | null | undefined }) {
  const [open, setOpen] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

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
        onClick={handleCloseUserMenu}
      >
        {user ? (
          <Box>
            <MenuItem>
              <Typography component="strong">{user.displayName}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => navigate("/profile")}>
              <Typography>Profile</Typography>
            </MenuItem>
            <MenuItem onClick={() => setOpen(true)}>
              <Typography>Logout</Typography>
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem onClick={() => navigate("/login")}>
              <Typography textAlign="center">Login</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate("/register")}>
              <Typography textAlign="center">Sign up</Typography>
            </MenuItem>
          </Box>
        )}
      </Menu>
      <SignOutConfirm open={open} setOpen={setOpen} />
    </>
  )
}
