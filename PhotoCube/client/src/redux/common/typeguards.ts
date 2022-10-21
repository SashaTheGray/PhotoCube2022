import { IHierarchy, ITag, ITagset } from "../../common/interfaces"

// Determine whether filter is an ITagFilter.
export function isTagFilter(filter: object): filter is ITag {
  return (
    "id" in filter &&
    "name" in filter &&
    "tagsetIdReplicate" in filter &&
    "tagTypeId" in filter &&
    "tagType" in filter &&
    "tagsetId" in filter &&
    "tagset" in filter &&
    "objectTagRelations" in filter
  )
}

export function isTagsetFilter(filter: object): filter is ITagset {
  return (
    "id" in filter &&
    "name" in filter &&
    "tags" in filter &&
    "hierarchies" in filter
  )
}

export function isHierarchyFilter(filter: object): filter is IHierarchy {
  return (
    "id" in filter &&
    "name" in filter &&
    "parentId" in filter &&
    "hierarchyId" in filter
  )
}
