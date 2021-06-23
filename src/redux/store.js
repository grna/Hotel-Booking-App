import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { roomsReducers } from "./reducers/roomsReducers";
import { fetchRooms } from "./actions/roomsActions";

const initialState = {};
const composeEnhanser =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    fromRooms: roomsReducers,
  }),
  initialState,
  composeEnhanser(applyMiddleware(thunk))
);

store.dispatch(fetchRooms());

export default store;
