import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import listingReducer from "./listingSlice";
const appStore = configureStore({
  reducer: { user: userReducer, listings: listingReducer },
});
export default appStore;
