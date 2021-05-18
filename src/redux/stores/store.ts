import { combineReducers, createStore } from "redux";
import userEventsReducer from "../reducers/UserReducer";

// const rootReducer = combineReducers({
//   userEvents: userEventsReducer
// })

// export type RootState = ReturnType<typeof rootReducer>

const store = userEventsReducer && createStore(userEventsReducer)

export default store