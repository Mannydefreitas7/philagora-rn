import { SharedValue } from "react-native-reanimated";
import type { ICardState } from "../../molecules/card";

export type TCarouselProps = Omit<
  CarouselState,
  "visibleItems" | "currentIndex" | "nextIndex" | "previousIndex" | "isScrolling"
> & {
  className?: string;
  initialIndex?: Readonly<number>;
  tabHeight: number;
  headerHeight: number;
};

export interface CarouselState<T extends ICardState = ICardState> {
  data: T[];
  currentIndex?: number;
  visibleItems: T[];
  isScrolling: boolean;
  aciveCardId?: string;
  scrollY?: SharedValue<number>;
  previousIndex?: number;
  nextIndex?: number;
}

// Actions
/// Filters out the readonly types
type TMutableKey = "UPDATE_CURRENT_INDEX" | "UPDATE_VIEWABLE_ITEMS" | "IS_SCROLLING" | "SCROLL_Y" | "UPDATE_ACTIVE_CARD_ID";
/// Carousel Actions.
export type TAction = {
  type: TMutableKey;
  payload: number | number[] | boolean | string;
};

// Context
export interface ICarouselContext {
  state: CarouselState;
  dispatch: React.Dispatch<TAction>;
}
