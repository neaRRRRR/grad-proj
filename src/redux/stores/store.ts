import { combineReducers, createStore } from "redux";
import userReducer from "../reducers/reducer";

const rootReducer = combineReducers({
  userEvents: userReducer
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer)

export default store