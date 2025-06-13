import { createSlice } from "@reduxjs/toolkit";

const frameLensSlice = createSlice({
  name: "frameLens",
  initialState: {
    frameId: null,
    lensId: null,
  },
  reducers: {
    setFrameId: (state, action) => {
      state.frameId = action.payload;
    },
    setLensId: (state, action) => {
      state.lensId = action.payload;
    },
    clearFrameLens: (state) => {
      state.frameId = null;
      state.lensId = null;
    },
  },
});

export const { setFrameId, setLensId, clearFrameLens } = frameLensSlice.actions;
export default frameLensSlice.reducer;
