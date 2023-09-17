import { Grid, Skeleton } from "@mui/material"

export function SkeletonGrid() {
  return (
    <Grid container spacing={5} px="20px">
      {Array.from(Array(6)).map((_, i) => (
        <Grid key={i} item xs={12} sm={6} md={4}>
          <Skeleton
            sx={{ borderRadius: "5px" }}
            variant="rectangular"
            width="100%"
            height={"20rem"}
            animation="wave"
          />
        </Grid>
      ))}
    </Grid>
  )
}
