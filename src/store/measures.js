import { createSlice } from "@reduxjs/toolkit";

//Slicer and Reducer
const measureSlice = createSlice({
  name: "measures",
  initialState: {
    measures: [],
  },
  reducers: {
    storeData(state, action) {
      state.measures = action.payload.measures;
    },
  },
});

//Actions
export const measuresActions = measureSlice.actions;

export default measureSlice.reducer;
