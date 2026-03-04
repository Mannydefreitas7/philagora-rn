import type { TabTriggerProps } from "expo-router/ui";
import type { ReactNode } from "react";

export interface ITab<T> {
	id: string;
	name: string;
	route: TabTriggerProps["href"];
	icon: T;
}

export interface ISheet {
	id: string;
	title: string;
	content: ReactNode | null;
}
