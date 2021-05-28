import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import managerReducer from "./features/manager/managerSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, managerReducer);

export const store = configureStore({
  reducer: {
    productManager: persistedReducer,
  },
});

export const persistor = persistStore(store);
