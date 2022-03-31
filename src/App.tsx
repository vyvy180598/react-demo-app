import { useStoreContext } from './auth/AuthContext'
import routes from './routes'

function App() {
  const [state, dispatch] = useStoreContext()
  return <div className="App">{routes(state.isAuthenticated)}</div>
}

export default App
