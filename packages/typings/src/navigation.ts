import { tabIcons } from "@repo/configs/icons";
import { TabTriggerProps } from "expo-router/ui";
import { ReactNode } from "react";

export interface ITab {
  id: string;
  name: string;
  route: TabTriggerProps["href"];
  icon: keyof typeof tabIcons;
}

export interface ISheet {
  id: string;
  title: string;
  content: ReactNode | null;
}
