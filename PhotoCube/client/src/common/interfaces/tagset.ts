/*
 * This module contains the tagset interface
 * */

import ITag from "./tag"
import IHierarchy from "./hierarchy"

interface ITagset {
  id: number
  name: string
  tags: Array<ITag>
  hierarchies: Array<IHierarchy>
}

export default ITagset
