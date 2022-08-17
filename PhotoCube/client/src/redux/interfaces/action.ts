/*
 * This module contains action interfaces
 * */

import IFilter from "./filter"

interface IAction {
  type: string
}

interface IFilterAction extends IAction {
  filter: IFilter
}

export { IFilterAction }
