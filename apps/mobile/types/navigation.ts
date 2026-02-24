import { tabIcons } from "@/constants/icons";
import { TabTriggerProps } from "expo-router/ui";
import { ReactElement } from "react";

export interface ITab {
  id: string;
  name: string;
  route: TabTriggerProps["href"];
  icon: keyof typeof tabIcons;
}
