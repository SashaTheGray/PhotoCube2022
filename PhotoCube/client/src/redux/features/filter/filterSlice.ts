/*
 * This module contains the filter slice
 */

// Imports.
import { createSlice } from "@reduxjs/toolkit"
import { IProjectionDimension, IFilter } from "../../interfaces"
import { ITag, ITagset, IHierarchy } from "../../../common/interfaces"
import { FilterTypes } from "../../enums"

// Define the department.
interface IFilterDepartment {
  tags: Set<ITag>
  tagsets: Set<ITagset>
  hierarchies: Set<IHierarchy>
  projectionDimensions: Set<IProjectionDimension>
}

// Set the initial state of the department.
const initialState: IFilterDepartment = {
  tags: new Set(),
  tagsets: new Set(),
  hierarchies: new Set(),
  projectionDimensions: new Set(),
}

// Define the Slice.
const filterSlice: any = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // Add a filter to the department.
    addFilter: (department: IFilterDepartment, props) => {
      const filter: IFilter = props.payload
      switch (filter.filterType) {
        case FilterTypes.TagFilter:
          department.tags.add(filter)
          return department
        case FilterTypes.TagsetFilter:
          department.tagsets.add(filter)
          return department
        case FilterTypes.HierarchyFilter:
          department.hierarchies.add(filter)
          return department
        default:
          return department
      }
    },
    // Remove a filter from the department.
    removeFilter: (department: IFilterDepartment, props) => {
      const filter: IFilter = props.payload
      switch (filter.filterType) {
        case FilterTypes.TagFilter:
          department.tags.delete(filter)
          return department
        case FilterTypes.TagsetFilter:
          department.tagsets.delete(filter)
          return department
        case FilterTypes.HierarchyFilter:
          department.hierarchies.delete(filter)
          return department
        default:
          return department
      }
    },
    // Clear all filters of a given type.
    clearFilters: (department: IFilterDepartment, props) => {
      const filtertype = props.payload
      switch (filtertype) {
        case FilterTypes.TagFilter:
          department.tags.clear()
          return department
        case FilterTypes.TagsetFilter:
          department.tagsets.clear()
          return department
        case FilterTypes.HierarchyFilter:
          department.hierarchies.clear()
          return department
        default:
          break
      }
    },
  },
})

export const { addFilter, removeFilter, clearFilters } = filterSlice.actions
export default filterSlice.reducer
