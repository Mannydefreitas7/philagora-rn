import { v4 } from "react-native-uuid/dist/v4";
import type { ICardState } from "./types";

export const initialState: ICardState = {
  id: v4(),
  title: "Title",
  description: "Description",
  date: new Date(),
  imageUri: "https://gemini.google.com/share/81087324368b",
  videoUri: "https://drive.google.com/file/d/1kr03Gvfu_DphxUemCW6GqjO-VDK0z-2u/view?usp=sharing",
};
