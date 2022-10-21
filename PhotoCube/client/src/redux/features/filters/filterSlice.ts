/*
 * This module contains the filter slice
 */

// Imports.
import { createSlice } from "@reduxjs/toolkit"
import { IProjectionDimension } from "../../interfaces"
import { ITagset, IHierarchy, ITag } from "../../../common/interfaces"
import {
  isTagFilter,
  isTagsetFilter,
  isHierarchyFilter,
} from "../../common/typeguards"

// Define the department types.
interface IFilterDepartment {
  tags: Set<ITag>
  tagsets: Set<ITagset>
  hierarchies: Set<IHierarchy>
  projectionDimensions: Set<IProjectionDimension>
  isLoading: boolean
}

const initialState: IFilterDepartment = {
  tags: new Set(),
  tagsets: new Set(),
  hierarchies: new Set(),
  projectionDimensions: new Set(),
  isLoading: false,
}

// Define the Slice.
const filterSlice: any = createSlice({
  // Name of this department/slice.
  name: "filters",

  // The initial state of this department/slice.
  initialState: initialState,

  reducers: {
    // Add a filter to the department.
    addFilter: (department, action) => {
      if (isTagFilter(action.payload) && !department.isLoading)
        department.tags.add(action.payload)
      else if (isTagsetFilter(action.payload) && !department.isLoading)
        department.tagsets.add(action.payload)
      else if (isHierarchyFilter(action.payload) && !department.isLoading)
        department.hierarchies.add(action.payload)
      else {
        if (department.isLoading)
          console.error("[-] Aborting addFilter -> department is locked")
        department
      }
    },

    // Remove a filter from the department.
    removeFilter: (department, action) => {
      if (isTagFilter(action.payload) && !department.isLoading)
        department.tags.delete(action.payload)
      else if (isTagsetFilter(action.payload) && !department.isLoading)
        department.tagsets.delete(action.payload)
      else if (isHierarchyFilter(action.payload) && !department.isLoading)
        department.hierarchies.delete(action.payload)
      else {
        if (department.isLoading)
          console.error("[-] Aborting removeFilter -> department is locked")
        department
      }
    },

    // Clear all filters of a given type.
    clearFilters: (department, action) => {
      if (isTagFilter(action.payload) && !department.isLoading)
        department.tags = new Set()
      else if (isTagsetFilter(action.payload) && !department.isLoading)
        department.tagsets = new Set()
      else if (isHierarchyFilter(action.payload) && !department.isLoading)
        department.hierarchies = new Set()
      else {
        if (department.isLoading)
          console.error("[-] Aborting clearFilters -> department is locked")
        department
      }
    },

    // Lock and unlock the department.
    lockFilterDepartment: (department) => {
      department.isLoading = true
    },
    unlockFilterDepartment: (department) => {
      department.isLoading = false
    },
  },
})

export const {
  addFilter,
  removeFilter,
  clearFilters,
  lockFilterDepartment,
  unlockFilterDepartment,
} = filterSlice.actions
export default filterSlice.reducer
