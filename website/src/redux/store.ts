import slice from "./slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { slice },
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
