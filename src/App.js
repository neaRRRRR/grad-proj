import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {ProtectedRoute} from './components/ProtectedRoute'
function App() {
  return (
    <Router>
    <div className="main">
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <ProtectedRoute exact path="/admin" component={AdminPage} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
