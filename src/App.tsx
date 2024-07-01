import { AppRoute } from './constants/AppRoute'
import Login from './pages/Login'
import Transactions from './pages/Transactions'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRoute.HOME} element={<Navigate to="/login" />} />
        <Route path={AppRoute.LOGIN} element={<Login />} />
        <Route path={AppRoute.TRANSACTIONS} element={<Transactions />} />
      </Routes>
    </Router>
  )
}

export default App
