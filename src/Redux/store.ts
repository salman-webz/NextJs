import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice"
import employeeReducer from "./features/employeeSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
