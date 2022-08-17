import {FilterTypes} from "../enums"

interface IFilter {
    id: number,
    name: string,
    filterType: FilterTypes
}

export default IFilter
