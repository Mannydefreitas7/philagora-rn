// Store slice for the card component

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./data";

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export const { setVisible } = cardSlice.actions;
export const reducer = cardSlice.reducer;
