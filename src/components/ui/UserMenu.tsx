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
import { Link } from "react-router-dom"
import { SignOutDialog } from "../"

interface UserMenuProps {
  readonly user: User | null | undefined
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpenSignOutDialog, setIsOpenSignOutDialog] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

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
            <MenuItem component={Link} to="/profile">
              <Typography>Profile</Typography>
            </MenuItem>
            <MenuItem onClick={() => setIsOpenSignOutDialog(true)}>
              <Typography>Logout</Typography>
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem component={Link} to="/login">
              <Typography textAlign="center">Login</Typography>
            </MenuItem>
            <MenuItem component={Link} to="/register">
              <Typography textAlign="center">Sign up</Typography>
            </MenuItem>
          </Box>
        )}
      </Menu>
      <SignOutDialog
        open={isOpenSignOutDialog}
        setOpen={setIsOpenSignOutDialog}
      />
    </>
  )
}
