export interface User {
	id: string;
	email: string;
	name: string;
	username: string;
	isHost: boolean;
	avatarUrl: string;
	bio: string;
	points: number;
	rank: string;
	level: number;
	createdAt: Date;
	updatedAt: Date;
}
