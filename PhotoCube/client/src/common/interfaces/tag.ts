/*
 * This module contains the tag interface
 * */

interface ITag {
    id: number,
    name: string,
    tagsetIdReplicate: number,
    tagTypeId: number,
    tagType: string,
    tagsetId: number,
    tagset: string,
    objectTagRelations: number
}
export default ITag
