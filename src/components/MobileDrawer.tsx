import { Box, Divider, Drawer, Stack, Typography } from "@mui/material"
import NavLinks from "./NavLinks"

interface MobileDrawerProps {
  readonly handleDrawerToggle: () => void
  readonly mobileOpen: boolean
}

export default function MobileDrawer({
  handleDrawerToggle,
  mobileOpen,
}: MobileDrawerProps) {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          width: "100%",
        },
      }}
    >
      <Box onClick={handleDrawerToggle}>
        <Box py={2}>
          <Typography variant="h6" align="center">
            Countries App
          </Typography>
        </Box>
        <Divider />
        <Stack direction="column">
          <NavLinks />
        </Stack>
      </Box>
    </Drawer>
  )
}
