import type { ICardState } from "@/molecules/card/types";

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
  previousIndex?: number;
  nextIndex?: number;
}

// Actions
/// Filters out the readonly types
type TMutableKey = "UPDATE_CURRENT_INDEX" | "UPDATE_VIEWABLE_ITEMS" | "IS_SCROLLING";
/// Carousel Actions.
export type TAction = {
  type: TMutableKey;
  payload: number | number[] | boolean;
};

// Context
export interface ICarouselContext {
  state: CarouselState;
  dispatch: React.Dispatch<TAction>;
}
