import { User } from '../redux/user/types'

import api from './api'

export const fetchUsers = (page: number, pageSize: number, search: string) => {
  const url = new URL('/users', location.origin)
  page && url.searchParams.append('_page', page.toString())
  pageSize && url.searchParams.append('_limit', pageSize.toString())
  search && url.searchParams.append('name', search)

  return api.get(url.pathname + url.search)
}

export const fetchUser = (id: string) => {
  return api.get(`/users/${id}`)
}

export const createUser = (user: User) => {
  return api.post('/users', user)
}

export const updateUser = (user: User) => {
  return api.put(`/users/${user.id}`, user)
}

export const deleteUser = (id: string) => {
  return api.delete(`/users/${id}`)
}
