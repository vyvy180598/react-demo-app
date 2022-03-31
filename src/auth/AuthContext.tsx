import React, { createContext, useContext, useReducer } from 'react'
import { initialState, reducer } from './reducer'

export const AuthContext = createContext<any | null>(null)

export const useStoreContext = () => {
  const [state, dispatch] = useContext(AuthContext)

  return [state, dispatch]
}
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  )
}
