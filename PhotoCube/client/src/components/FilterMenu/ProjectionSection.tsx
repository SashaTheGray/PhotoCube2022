import { Box, Button, Stack } from "@mui/material"

interface ProjectionAxisProps {
  name: string
  filterName: string
}

const ProjectionSectionStyle = {
  display: "flex",
  flexDirection: "column",
  border: "3px solid black",
  borderRadius: "5px",
  backgroundColor: "red",
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  height: "20%",
}

// Representing the selection of a projection axis.
const ProjectionAxis = (props: ProjectionAxisProps) => {
  const { name, filterName } = props
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ height: "20px", margin: "5px" }}
      >
        <h4>{name}</h4>
        <Button variant="contained" sx={{ width: "50px", height: "20px" }}>
          {filterName}
        </Button>
      </Stack>
    </>
  )
}

// Representing the projection selection section of the filter menu.
const ProjectionSection = () => {
  return (
    <>
      <Box sx={ProjectionSectionStyle}>
        <Stack
          sx={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Projections</h3>
          <ProjectionAxis name="X" filterName="None" />
          <ProjectionAxis name="Y" filterName="None" />
        </Stack>
      </Box>
    </>
  )
}

export default ProjectionSection
