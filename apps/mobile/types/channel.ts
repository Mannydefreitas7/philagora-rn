import type { Audio } from "./audio";
import type { Video } from "./video";

export type Channel = {
	id: string;
	title: string;
	description: string;
	type: Audio | Video;
	uri: string;
	duration: number;
	createdAt: Date;
	updatedAt: Date;
};
