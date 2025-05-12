import { createSlice } from "@reduxjs/toolkit";

const listingSlice = createSlice({
  name: "listings",
  initialState: {
    myListings: null,
  },
  reducers: {
    addListings: (state, action) => {
      state.myListings = action.payload;
    },
    removeListings: (state, action) => {
      state.myListings = null;
    },
  },
});
export const { addListings, removeListings } = listingSlice.actions;
export default listingSlice.reducer;
