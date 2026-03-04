import type { User } from "./user";

export interface Debate {
	id: string;
	title: string;
	type: "debate";
	image: string;
	description: string;
	participants: User[];
	createdAt: Date;
	updatedAt: Date;
}
