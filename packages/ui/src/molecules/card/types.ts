import type { SharedValue } from "react-native-reanimated";

export type TCardProps = ICardState & {
	index: number;
	scrollY: SharedValue<number>;
	focusedHeight: number;
	peekHeight: number;
	snapInterval: number;
};

export interface ICardState {
	id: string;
	description: string;
	title: string;
	imageUri?: string;
	date?: Date;
	videoUri?: string;
}
