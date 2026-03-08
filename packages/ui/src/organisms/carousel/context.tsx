// Store slice for the card component

import { createContext, useCallback, useContext, useMemo } from "react";
import { useImmerReducer } from "use-immer";
import type { ICardState } from "../../molecules/card";
import { initialState } from "./data";
import type { CarouselState, ICarouselContext, TAction } from "./types";

// Context for the carousel.
const CarouselContext = createContext<ICarouselContext | undefined>(undefined);

// Reducer
const reducer = (state: CarouselState, action: TAction) => {
  if (action.type === "UPDATE_CURRENT_INDEX" && typeof Number(action.payload) === "number") {
    state.currentIndex = action.payload as number;
    return state;
  }
  if (action.type === "UPDATE_ACTIVE_CARD_ID" && typeof action.payload === "string") {
    state.aciveCardId = action.payload as string;
    return state;
  };
  if (action.type === "SCROLL_Y" && typeof Number(action.payload) === "number") {
    const scrollY = Math.abs(action.payload as number) / 100;

    state.scrollY = 1 - scrollY;
    return state;
  }
  if (action.type === "UPDATE_VIEWABLE_ITEMS" && Array.isArray(action.payload)) {
    const payload = action.payload as number[];
    state.visibleItems = state.data.filter((_, index) => {
      return payload.includes(index);
    });
    return state;
  }
  if (action.type === "IS_SCROLLING" && typeof action.payload === "boolean") {
    state.isScrolling = action.payload as boolean;
    if (action.payload && state.aciveCardId) {
      state.aciveCardId = undefined;
    }
    return state;
  }
  return state;
};

// Provider wrapper.
const Provider = ({ children }: { children: React.ReactNode }) => {
  // Actions
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  //
  return <CarouselContext.Provider value={{ state, dispatch }}>{children}</CarouselContext.Provider>;
};

export const CarouselProvider = Provider;
//
export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("State for CarouselContext is not loaded.");
  }
  const { state, dispatch } = context;
  //
  const isVisible = useCallback(
    (item: ICardState["id"]) => {
      return state.visibleItems.length > 0 && state.visibleItems.map((i) => i.id).includes(item);
    },
    [state.visibleItems],
  );

  const isFirst = useCallback(
    (item: ICardState["id"]) => state.visibleItems.length > 0 && state.visibleItems[0]?.id === item,
    [state.visibleItems],
  );

  const isScrolling = useMemo(() => state.isScrolling, [state.isScrolling]);
  const scrollY = useMemo(() => state.scrollY, [state.scrollY]);
  const activeCard = useMemo(() => state.data.find((item) => state.aciveCardId && item.id === state.aciveCardId), [state.aciveCardId, state.data]);


  //
  return { state, dispatch, isVisible, isFirst, isScrolling, scrollY, activeCard };
};
