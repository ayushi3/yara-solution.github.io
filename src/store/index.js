import { configureStore } from "@reduxjs/toolkit";
import measures from "./measures";

//store
const store = configureStore({
  reducer: {
    measures: measures,
  },
});

export default store;
