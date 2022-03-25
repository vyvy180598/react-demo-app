import { Dashboard } from '../pages/Dashboard'
import { UserPage } from '../pages/User/UserPage'
import { UserDetails } from '../pages/User/UserDetails'

import { useRoutes } from 'react-router-dom'

function Routes() {
  return useRoutes([
    { path: '/', element: <Dashboard /> },
    {
      path: '/users',
      element: <UserPage />,
      children: [{ path: ':userId', element: <UserDetails /> }]
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

export default Routes
