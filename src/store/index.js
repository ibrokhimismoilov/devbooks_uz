import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducers/userReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(logger, thunk)));
const persistor = persistStore(store);

export { store as default, persistor };
