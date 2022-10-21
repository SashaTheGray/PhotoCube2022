/*
 * This module contains the FilterMenu component
 * */

import { Box, Stack } from "@mui/material"
import FilterSection from "./FilterSection"
import ProjectionSection from "./ProjectionSection"
import FilterTypes from "../../common/enums/filter-type-enums"
import { useAppSelector } from "../../common/hooks"

const FilterMenuStyle = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  borderRadius: "5px",
  justifyContent: "center",
  alignItems: "center",
  border: "3px solid black",
  margin: "5px",
  height: "85vh",
}

const FilterMenu = () => {
  const { tags, tagsets, hierarchies } = useAppSelector(
    (store) => store.filters
  )
  return (
    <>
      <Box sx={FilterMenuStyle}>
        <ProjectionSection />
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          style={{
            margin: "5px",
            width: "100%",
            height: "75%",
          }}
        >
          <FilterSection filterType={FilterTypes.TagFilter} filters={tags} />
          <FilterSection
            filterType={FilterTypes.TagsetFilter}
            filters={tagsets}
          />
          <FilterSection
            filterType={FilterTypes.HierarchyFilter}
            filters={hierarchies}
          />
        </Stack>
      </Box>
    </>
  )
}

export default FilterMenu
