import { createSlice } from "@reduxjs/toolkit";

const frameLensSlice = createSlice({
  name: "frameLens",
  initialState: {
    frameId: null,
    lensId: null,
    readingGlassId: null,
    contactLensId: null,
  },
  reducers: {
    setFrameId: (state, action) => {
      state.frameId = action.payload;
    },
    setLensId: (state, action) => {
      state.lensId = action.payload;
    },
    setReadingGlassId: (state, action) => {
      state.readingGlassId = action.payload;
    },
    setContactLensId: (state, action) => {
      state.contactLensId = action.payload;
    },
    clearFrameLens: (state) => {
      state.frameId = null;
      state.lensId = null;
      state.readingGlassId = null;
      state.contactLensId = null;
    },
  },
});

export const {
  setFrameId,
  setLensId,
  setReadingGlassId,
  setContactLensId,
  clearFrameLens,
} = frameLensSlice.actions;
export default frameLensSlice.reducer;
