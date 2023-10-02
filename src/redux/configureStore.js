import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "@/features/api/apiSlice";
import authReducer from "@/features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import recordReducer from "../features/record/recordSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    users: userReducer,
    record: recordReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: !process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);