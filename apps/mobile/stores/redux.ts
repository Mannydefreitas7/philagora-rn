import { cardReducer } from "@/components/molecules/card";
import { carouselReducer } from "@/components/organisms/carousel";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    carousel: carouselReducer,
    card: cardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
