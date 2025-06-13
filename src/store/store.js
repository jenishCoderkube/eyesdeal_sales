import { configureStore } from "@reduxjs/toolkit";
import PowerSlice from "./Power/specsPowerSlice.js";
import frameLensReducer from "./FrameLens/frameLensSlice.js";

export const store = configureStore({
  reducer: {
    specsPower: PowerSlice,
    frameLens: frameLensReducer,
  },
});
