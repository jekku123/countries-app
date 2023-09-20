import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { Fab } from "@mui/material"
import Box from "@mui/material/Box"
import Fade from "@mui/material/Fade"
import useScrollTrigger from "@mui/material/useScrollTrigger"

export default function ScrollTop() {
  const trigger = useScrollTrigger({
    threshold: 100,
    disableHysteresis: true,
  })

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <Fab size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  )
}
