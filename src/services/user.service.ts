import { User } from '../redux/user/types'

import api from './api'

export const fetchUsers = () => {
  return api.get('/users')
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
