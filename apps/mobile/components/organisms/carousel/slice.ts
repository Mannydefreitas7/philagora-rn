// Store slice for the card component

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./data";
import { TCardProps } from "@/components/molecules/card/types";

export const carouselSlice = createSlice({
  name: "carousel",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setVisibleItems: (state, action: PayloadAction<TCardProps[]>) => {
      state.visibleItems = action.payload;
    },
    setPreviousIndex: (state, action: PayloadAction<number>) => {
      state.previousIndex = action.payload;
    },
    setNextIndex: (state, action: PayloadAction<number>) => {
      state.nextIndex = action.payload;
    },
  },
});

export const { setVisibleItems, setPreviousIndex, setNextIndex } = carouselSlice.actions;

export const reducer = carouselSlice.reducer;
