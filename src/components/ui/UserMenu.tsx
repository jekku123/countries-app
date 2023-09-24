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
import useFirebaseAuth from "../../hooks/useFirebaseAuth"

export default function UserMenu({ user }: { user: User | null | undefined }) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const { signOut } = useFirebaseAuth()
  const navigate = useNavigate()

  return (
    <>
      <Tooltip title="User settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Avatar" src={user?.photoURL ?? ""} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
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
              <Typography component="strong">
                {user.displayName ?? user.email}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography onClick={() => navigate("/profile")}>
                Profile
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography onClick={signOut}>Logout</Typography>
            </MenuItem>
          </Box>
        ) : (
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center" onClick={() => navigate("/login")}>
              Login
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}
