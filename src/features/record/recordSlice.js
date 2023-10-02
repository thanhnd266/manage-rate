import { createSlice } from "@reduxjs/toolkit";

const recordSlice = createSlice({
  name: "record",
  initialState: {
    record: {}
  },
  reducers: {
    setRecord: (state, action) => {
      state.record = {...action.payload}; 
    },
  },
});

export const { setRecord } = recordSlice.actions;

export default recordSlice.reducer;

