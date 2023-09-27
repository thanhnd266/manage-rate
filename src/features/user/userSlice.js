import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: []
  },
  reducers: {
    setUsers: (state, action) => {
      state.user = {...action.payload}; 
    },
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;

