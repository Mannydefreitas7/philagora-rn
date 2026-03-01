import { ICardState } from "@/components/molecules/card/types";

export type TCarouselProps = CarouselState & {
  spacing: number;
};

export interface CarouselState<T extends ICardState = ICardState> {
  type?: "carousel";
  initialIndex: number;
  data: T[];
  currentIndex: number;
  visibleItems: T[];
  previousIndex?: number;
  nextIndex?: number;
}
