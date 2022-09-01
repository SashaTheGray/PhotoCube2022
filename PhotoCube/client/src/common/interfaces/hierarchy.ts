/*
 * This module contains the hierarchy interface
 * */

interface IHierarchy {
  id: number
  name: string
  parentId?: number
  tagId?: number
  hierarchyId?: number
}
export default IHierarchy
