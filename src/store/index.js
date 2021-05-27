import { configureStore } from "@reduxjs/toolkit";
import managerReducer from "./features/manager/managerSlice";

export const store = configureStore({
  reducer: {
    productManager: managerReducer,
  },
});
