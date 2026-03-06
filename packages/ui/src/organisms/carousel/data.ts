import uuid from "react-native-uuid";
import type { ICardState } from "#molecules";
import type { CarouselState } from "./types";

export const DATA: ICardState[] = [
  {
    id: uuid.v4(),
    title: "Debate: Subject 1 vs Subject 2",
    description: "Dr. John and Dr. Phil",
    date: new Date(),
    imageUri: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo2.jpeg",
    videoUri: "https://drive.google.com/file/d/1AF5RiQcnWnp4qbgNIH8FkYG5uDItpmTz/view",
  },
  {
    id: uuid.v4(),
    title: "Debate: Subject 3 vs Subject 4",
    description: "Dr. John and Dr. Phil",
    date: new Date(),
    imageUri: "https://i.pinimg.com/1200x/91/52/b2/9152b2dc174934279cda4509b0931434.jpg",
    videoUri: "https://drive.google.com/file/d/1AF5RiQcnWnp4qbgNIH8FkYG5uDItpmTz/view",
  },
  {
    id: uuid.v4(),
    title: "Debate: Subject 5 vs Subject 6",
    description: "Dr. John and Dr. Phil",
    date: new Date(),
    imageUri: "https://i.pinimg.com/1200x/1e/38/7f/1e387f131098067f7a9be0bc68b0b6f2.jpg",
    videoUri: "https://drive.google.com/file/d/1AF5RiQcnWnp4qbgNIH8FkYG5uDItpmTz/view",
  },
  {
    id: uuid.v4(),
    title: "Debate: Subject 7 vs Subject 8",
    description: "Dr. John and Dr. Phil",
    date: new Date(),
    imageUri: "https://i.pinimg.com/736x/43/e0/e0/43e0e0a542c0ccfbc5cf1b802bcf2d66.jpg",
    videoUri: "https://drive.google.com/file/d/1AF5RiQcnWnp4qbgNIH8FkYG5uDItpmTz/view",
  },
  {
    id: uuid.v4(),
    title: "Debate: Subject 5 vs Subject 6",
    description: "Dr. John and Dr. Phil",
    date: new Date(),
    imageUri: "https://i.pinimg.com/1200x/1e/38/7f/1e387f131098067f7a9be0bc68b0b6f2.jpg",
    videoUri: "https://drive.google.com/file/d/1AF5RiQcnWnp4qbgNIH8FkYG5uDItpmTz/view",
  },
  {
    id: uuid.v4(),
    title: "Debate: Subject 7 vs Subject 8",
    description: "Dr. John and Dr. Phil",
    date: new Date(),
    imageUri: "https://i.pinimg.com/736x/43/e0/e0/43e0e0a542c0ccfbc5cf1b802bcf2d66.jpg",
    videoUri: "https://drive.google.com/file/d/1AF5RiQcnWnp4qbgNIH8FkYG5uDItpmTz/view",
  },
];

export const initialState: CarouselState<ICardState> = {
  visibleItems: [],
  isScrolling: false,
  data: DATA,
};
