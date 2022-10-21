/* This module contains server requests functions. */

import URIS from "./uris"

//
// TAGS
//

export const fetchAllTagFilters = async () => {
  return await fetch(URIS.ALL_TAGS)
    .then((response) => response.json())
    .catch((error) => console.error(`[-] ${error}`))
}

export const fetchTagFilterById = async (id: number) => {
  return await fetch(URIS.TAG_BY_ID(id))
    .then((response) => response.json())
    .catch((error) => console.error(`[-] ${error}`))
}
export const fetchTagFiltersByName = async (name: string) => {
  return await fetch(URIS.TAG_BY_NAME(name))
    .then((response) => response.json())
    .catch((error) => console.error(`[-] ${error}`))
}
export const fetchTagFilterNodesById = async (id: number) => {
  return await fetch(URIS.TAG_NODES_BY_ID(id))
    .then((response) => response.json())
    .catch((error) => console.error(`[-] ${error}`))
}

//
// TAGETS
//

export const fetchAllTagsetFilters = async () => {
  return await fetch(URIS.ALL_TAGSETS)
    .then((response) => response.json())
    .catch((error) => console.error(`[-] ${error}`))
}
export const fetchTagsetFilterById = async (id: number) => {
  return await fetch(URIS.TAGSET_BY_ID(id))
    .then((response) => response.json())
    .catch((error) => console.error(`[-] ${error}`))
}
export const fetchTagsetFiltersByName = async (name: string) => {
  return await fetch(URIS.TAGSET_BY_NAME(name))
    .then((response) => response.json())
    .catch((error) => console.error(`[-] ${error}`))
}

//
// Hierarchies
//

export const fetchAllHierarchyFilters = async () => {
  return await fetch(URIS.ALL_NODES)
    .then((response) => response.json())
    .catch((error) => console.error(`[-] ${error}`))
}
export const fetchHierarchyFilterById = async (id: number) => {
  return await fetch(URIS.NODE_BY_ID(id))
    .then((response) => response.json())
    .catch((error) => console.error(`[-] ${error}`))
}
export const fetchHierarchyFiltersByName = async (name: string) => {
  return await fetch(URIS.NODE_BY_NAME(name))
    .then((response) => response.json())
    .catch((error) => console.error(`[-] ${error}`))
}
export const fetchHierarchyFilterChildrenById = async (id: number) => {
  return await fetch(URIS.NODE_CHILDREN_BY_ID(id))
    .then((response) => response.json())
    .catch((error) => console.error(`[-] ${error}`))
}
export const fetchHierarchyFilterParentById = async (id: number) => {
  return await fetch(URIS.NODE_PARENT_BY_ID(id))
    .then((response) => response.json())
    .catch((error) => console.error(`[-] ${error}`))
}
export const fetchHierarchyFilterTreeById = async (id: number) => {
  return await fetch(URIS.NODE_TREE_BY_ID(id))
    .then((response) => response.json())
    .catch((error) => console.error(`[-] ${error}`))
}
