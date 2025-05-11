import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  name: "",
  uid: "",
  access_token: "",
  role: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { name, access_token, role, uid } = action.payload;
      state.name = name;
      state.access_token = access_token;
      state.role = role;
      state.isLoggedIn = true;
      state.uid = uid;
    },
    removeUser: (state, action) => {
      state.isLoggedIn = false;
      state.name = "";
      state.uid = "";
      state.access_token = "";
      state.role = "";
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
