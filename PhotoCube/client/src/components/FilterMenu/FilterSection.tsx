import { Box, Stack, List, ListItem, ListItemText, Button } from "@mui/material"
import { IHierarchy, ITag, ITagset } from "../../common/interfaces/"
import FilterTypes from "../../common/enums/filter-type-enums"
import { FilterModal } from "./FilterModal"
import { useState } from "react"

interface FilterSectionProps {
  filterType: FilterTypes
  filters: Set<IHierarchy> | Set<ITagset> | Set<ITag>
}

const FilterSectionStyle = {
  borderRadius: "5px",
  border: "3px solid black",
  backgroundColor: "white",
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

// Representing a single block of filter selection in the filter menu.
const FilterSection = ({ filterType, filters }: FilterSectionProps) => {
  // Modal setup.
  const [modalState, setModalState] = useState(false)
  const openModal = () => setModalState(true)
  const closeModal = () => setModalState(false)

  return (
    <>
      <Box style={FilterSectionStyle}>
        <Stack alignItems="center" sx={{ height: "100%", width: "100%" }}>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            spacing={2}
          >
            <h3>{filterType}</h3>
            <Button variant="contained" onClick={openModal}>
              Modify
            </Button>
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
              {[...filters].map((filter) => (
                <ListItem>
                  <ListItemText primary={filter.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </Box>
      <FilterModal
        modalState={modalState}
        closeModal={closeModal}
        filterType={filterType}
      />
    </>
  )
}

export default FilterSection
