import { Box, Stack, List, ListItem, ListItemText, Button } from "@mui/material"
import { IHierarchy, ITag, ITagset } from "../../common/interfaces/"

interface FilterSectionProps {
  filterName: string
  filters: Set<IHierarchy> | Set<ITagset> | Set<ITag>
}

const FilterSectionStyle = {
  borderRadius: "5px",
  border: "3px solid black",
  backgroundColor: "red",
  width: "30%",
  height: "80%",
}

const FilterListStyle = {
  height: "95%",
  width: "95%",
  maxWidth: "95%",
  maxHeight: "95%",
  position: "relative",
  overflow: "auto",
}

// Representing a single row of filter selection in the filter menu.
const FilterSection = (props: FilterSectionProps) => {
  const filterName = props.filterName
  const filters = props.filters

  return (
    <>
      <Box style={FilterSectionStyle}>
        <Stack alignItems="center" sx={{ height: "100%", width: "100%" }}>
          <h3>{filterName}</h3>
          <Stack direction="row" spacing={2}>
            <Button variant="contained">Add</Button>
            <Button variant="contained">Clear</Button>
          </Stack>
          <Box
            sx={{
              display: "flex",
              border: "2px solid black",
              margin: "5px",
              width: "90%",
              height: "60%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <List sx={FilterListStyle} dense>
              {Array.from(filters, filter => filter.name).map((filter) => (
                <ListItem key={`{${filter}}`}>
                  <ListItemText primary={`${filter}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </Box>
    </>
  )
}

export default FilterSection
