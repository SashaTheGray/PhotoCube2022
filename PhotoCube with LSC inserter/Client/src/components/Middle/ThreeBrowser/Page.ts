import ICell from "./Cell";

/**
 * Represent a page of result, returned from api/cell?.. call.
 * Is similar to Page.cs in the server implementation.
 */
 export default interface Page{
    CurrentPage:number,
    PageCount:number,
    PageSize:number,
    TotalFileCount:number,
    FirstRowOnPage:number,
    LastRowOnPage:number,

    Results:ICell[]
}