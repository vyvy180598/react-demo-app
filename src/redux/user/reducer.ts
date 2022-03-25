import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, IUsers } from './types'

const initialState: IUsers = {
  value: [],
  item: undefined
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.value = action.payload
    },
    setUser(state, action: PayloadAction<User>) {
      state.item = action.payload
    },
    addUser(state, action: PayloadAction<User>) {
      state.value.push(action.payload)
    },
    editUser(state, action: PayloadAction<User>) {
      state.value.map((item) =>
        item.id === action.payload.id ? action.payload : item
      )
    },
    removeUser(state, action: PayloadAction<string>) {
      state.value = state.value.filter((item) => item.id !== action.payload)
    }
  }
})

export const { setUsers, setUser, addUser, editUser, removeUser } =
  usersSlice.actions

export default usersSlice.reducer
