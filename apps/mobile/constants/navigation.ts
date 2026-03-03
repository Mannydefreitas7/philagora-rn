import { ITab } from "@/types/navigation";
import uuid from "react-native-uuid";
import { FONT_SIZE, SPACING } from "./size";

export const tabs: ITab[] = [
  {
    id: uuid.v4(),
    name: "agora",
    route: "/(public)/(tabs)",
    icon: "home",
  },
  {
    id: uuid.v4(),
    name: "explore",
    route: "/explore",
    icon: "search",
  },
  {
    id: uuid.v4(),
    name: "events",
    route: "/calendar",
    icon: "calendar",
  },
  {
    id: uuid.v4(),
    name: "profile",
    route: "/profile",
    icon: "profile",
  },
];

export const HEADER = {
  spacing: {
    paddingVertical: SPACING.md * 2,
    paddingHorizontal: SPACING.md,
  },
};

export const BOTTOM_TAB = {
  tabs,
  spacing: {
    icon: SPACING.xl,
    label: FONT_SIZE.sm,
    paddingVertical: SPACING.lg * 2,
    paddingHorizontal: SPACING.md,
  },
};
