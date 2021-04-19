import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {ProtectedRoute} from './components/ProtectedRoute'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import userReducer from './redux/reducers/reducer'



function App() {

  const store = createStore(userReducer,applyMiddleware(thunk))
  
  return (
    <Provider store={store}>
    <Router>
    <div className="main">
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <ProtectedRoute exact path="/admin" component={AdminPage} /> 
      </Switch>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
