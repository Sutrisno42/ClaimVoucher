import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/AuthSlice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});