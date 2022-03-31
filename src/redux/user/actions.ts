import {
  GET_USERS,
  GET_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
} from './constants'
import { User } from './types'

export interface IGetUsersAction {
  type: typeof GET_USERS
  payload: {
    page: number
    limit: number
    search: string
  }
}

export interface IGetUserAction {
  type: typeof GET_USER
  payload: {
    id: string
  }
}

export interface ICreateUsersAction {
  type: typeof CREATE_USER
  payload: {
    user: User
  }
}

export interface IUpdateUserAction {
  type: typeof UPDATE_USER
  payload: {
    user: User
  }
}

export interface IDeleteUserAction {
  type: typeof DELETE_USER
  payload: {
    id: string
  }
}

export const getUsers = (
  page: number,
  limit: number,
  search: string
): IGetUsersAction => {
  return {
    type: GET_USERS,
    payload: {
      page: page,
      limit: limit,
      search: search
    }
  }
}

export function getUser(id: string): IGetUserAction {
  return {
    type: GET_USER,
    payload: { id }
  }
}

export const addUser = (user: User): ICreateUsersAction => {
  return {
    type: CREATE_USER,
    payload: { user }
  }
}

export const updateUser = (user: User): IUpdateUserAction => {
  return {
    type: UPDATE_USER,
    payload: { user }
  }
}

export const deleteUser = (id: string): IDeleteUserAction => {
  return {
    type: DELETE_USER,
    payload: { id }
  }
}
