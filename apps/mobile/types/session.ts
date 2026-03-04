import type { Channel } from "./channel";
import type { Host } from "./host";

export type Session<T extends { type: string }> = T & {
	id: string;
	startedAt: Date;
	endedAt?: Date;
	host: Host | Host[];
	type: T["type"];
	channels: Channel[];
	duration?: Date;
	createdAt: Date;
	updatedAt: Date;
};
