import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth"], // only persist auth slice
};

const rootReducer = combineReducers({
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export default store;
export const persistor = persistStore(store);