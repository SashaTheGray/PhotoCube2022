/*
 * This module contains URIs for the application.
 * */

// Base url of the API.\
const PROTOCOL: string = "https"
const HOST: string = "localhost"
const PORT: string = "5001"
const API: string = `${PROTOCOL}://${HOST}:${PORT}/api`

// URIs.
const URIS = {
  // Cell.
  CELL: "Cell",

  // CubeObjects
  ALL_CUBEOBJECTS: `${API}/CubeObject`,
  CUBEOBJECT_BY_ID: (id: number) => `${API}/CubeObject/${id}`,
  CUBEOBJECT_TAGS_BY_ID: (id: number) => `${API}/CubeObject/${id}/tags`,

  // Hierarchies.
  ALL_NODES: `${API}/Node`,
  NODE_BY_ID: (id: number) => `${API}/Node/${id}`,
  NODE_BY_NAME: (name: string) => `${API}/Node/name=${name}`,
  NODE_CHILDREN_BY_ID: (id: number) => `${API}/Node/${id}/children`,
  NODE_PARENT_BY_ID: (id: number) => `${API}/Node/${id}/parent`,
  NODE_TREE_BY_ID: (id: number) => `${API}/Node/${id}/tree`,

  // Photos.
  PHOTO_BY_ID: (id: number) => `${API}/Photo/${id}`,

  // Tags.
  ALL_TAGS: `${API}/Tag`,
  TAG_BY_ID: (id: number) => `${API}/Tag/${id}`,
  TAG_BY_NAME: (name: string) => `${API}/Tag/name=${name}`,
  TAG_NODES_BY_ID: (id: number) => `${API}/Tag/${id}/nodes`,

  // Tagsets.
  ALL_TAGSETS: `${API}/Tagset`,
  TAGSET_BY_ID: (id: number) => `${API}/Tagset/${id}`,
  TAGSET_BY_NAME: (name: string) => `${API}/Tagset/name=${name}`,

  // Thumbnails.
  ALL_THUMBNAILS: `${API}/Thumbnail`,
  THUMBNAIL_BY_ID: (id: number) => `${API}/Thumbnail/${id}`,
}

export default URIS
