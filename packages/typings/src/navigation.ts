import type { TabTriggerProps } from "expo-router/ui";
import type { ReactNode } from "react";

export interface ITab {
  id: string;
  name: TabTriggerProps['name'];
  route: TabTriggerProps["href"];
}

export interface ISheet {
  id: string;
  title: string;
  content: ReactNode | null;
}
