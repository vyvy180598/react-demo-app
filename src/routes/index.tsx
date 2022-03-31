import { Dashboard } from '../pages/Dashboard'
import { UserPage } from '../pages/User/UserPage'
import { UserDetails } from '../pages/User/UserDetails'

import { Navigate, useRoutes } from 'react-router-dom'
import { LoginPage } from '../pages/Login'
import { MainLayout } from '../layout/MainLayout'

const routes = (isLoggedIn: any) => {
  return useRoutes([
    {
      path: '/',
      element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
      children: [
        {
          path: '',
          element: <Dashboard />
        },
        {
          path: '/users',
          element: <UserPage />
        },
        {
          path: '/users/:userId',
          element: <UserDetails />
        }
      ]
    },
    {
      path: '/login',
      element: !isLoggedIn ? <LoginPage /> : <Navigate to="/" />
    },
    {
      path: '*',
      element: (
        <main style={{ padding: '1rem' }}>
          <p>There's nothing here!</p>
        </main>
      )
    }
  ])
}

export default routes
