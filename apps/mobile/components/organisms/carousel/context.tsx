// Store slice for the card component
import { initialState } from "./data";
import { createContext, useCallback, useContext } from "react";
import { useImmerReducer } from 'use-immer';
import { CarouselState, ICarouselContext, TAction } from "./types";
import { TActionPrefix } from "@/types/reducer";
import { ICardState } from "@/components/molecules/card/types";

// Context for the carousel.
const CarouselContext = createContext<ICarouselContext | undefined>(undefined);

// Reducer
const reducer = (state: CarouselState, action: TAction) => {
  if (action.type === 'UPDATE_CURRENT_INDEX' && !Array.isArray(action.payload)) {
    state.currentIndex = action.payload;
    return state;
  }
  if (action.type === 'UPDATE_VIEWABLE_ITEMS' && Array.isArray(action.payload)) {
    state.visibleItems = state.data.filter((_, index) => {
      return Array(action.payload).includes(index);
    })
    return state;
  }
  return state;
};

// Provider wrapper.
const Provider = ({ children }: { children: React.ReactNode }) => {
  // Actions
  const [state, dispatch] = useImmerReducer(reducer, initialState);
 //
  return <CarouselContext.Provider value={{ state, dispatch }}>
    {children}
  </CarouselContext.Provider>;
};

export const CarouselProvider = Provider;
//
export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('State for CarouselContext is not loaded.')
  }
  const { state, dispatch } = context;
  //
  const isVisible = useCallback((item: ICardState['id']) => {
      return state.visibleItems.length > 0 && state.visibleItems.map(i => i.id).includes(item);
  }, [state.visibleItems]);

  const isFirst = useCallback((item: ICardState['id']) => state.visibleItems.length > 0 && state.visibleItems[0].id === item, [state.visibleItems, state.data]);

  //
  return { state, dispatch, isVisible, isFirst };
}
