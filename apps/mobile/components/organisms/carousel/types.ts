import { ICardState } from "@/components/molecules/card/types";

export type TCarouselProps = Omit<CarouselState, 'visibleItems' | 'currentIndex' | 'nextIndex' | 'previousIndex'> & {
  className?: string;
  initialIndex?: Readonly<number>;
};

export interface CarouselState<T extends ICardState = ICardState> {
  data: T[];
  currentIndex?: number;
  visibleItems: T[];
  previousIndex?: number;
  nextIndex?: number;
}

// Actions
/// Filters out the readonly types
type TMutableKey = 'UPDATE_CURRENT_INDEX' | 'UPDATE_VIEWABLE_ITEMS';
/// Carousel Actions.
export type TAction = { type: TMutableKey, payload: number | number[] };

// Context
export interface ICarouselContext {
  state: CarouselState;
  dispatch: React.Dispatch<TAction>;
}
