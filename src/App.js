import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom' //buildlemeden once HashRouter yap burayi
import {ProtectedRoute} from './components/ProtectedRoute'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import userReducer from './redux/reducers/reducer'
import IdReducer from './redux/reducers/IdReducer'
import AdvFieldReducer from './redux/reducers/AdvFieldReducer'
import FilterMapReducer from './redux/reducers/FilterMapReducer'
import RandomReducer from './redux/reducers/RandomReducer'
import SortDesignsReducer from './redux/reducers/SortDesignsReducer'
import FilterDesignsReducer from './redux/reducers/FilterDesignsReducer'
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
}

const rootReducer = combineReducers({
  User: userReducer,
  Random: RandomReducer,
  IdPass: IdReducer,
  FieldPass: AdvFieldReducer,
  FilterMap: FilterMapReducer,
  SortDesigns: SortDesignsReducer,
  FilterDesigns:FilterDesignsReducer
})



function App() {

  const store = createStore(rootReducer, applyMiddleware(thunk))
 
  
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
export type RootState = ReturnType<typeof rootReducer>