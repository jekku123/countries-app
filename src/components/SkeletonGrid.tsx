import { Skeleton, Stack } from "@mui/material"

export default function SkeletonGrid() {
  return (
    <Stack direction="row" justifyContent="center" flexWrap="wrap" gap={5}>
      {Array.from(Array(6)).map((_, i) => (
        <Skeleton
          sx={{ borderRadius: "5px" }}
          variant="rectangular"
          width="300px"
          height="325px"
          animation="wave"
        />
      ))}
    </Stack>
  )
}
