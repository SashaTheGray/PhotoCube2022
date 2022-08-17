/*
 * This module contains hooks to be used in the application.
 */

 import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
 import {RootState, AppDispath} from "../redux/store"

 // These hooks are to be used instead of the traditional:
 // 'useDispatch' and 'useSelector'.
 export const useAppDispatch: () => AppDispath = useDispatch
 export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
