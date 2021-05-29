import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage";
import managerReducer from "./features/manager/managerSlice";

const persistConfig = {
  key: "manager",
  version: 1,
  storage,
  stateReconciler: hardSet,
};

const reducers = combineReducers({
  productManager: managerReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

let persistor = persistStore(store);

export { store, persistor };
