import uuid from "react-native-uuid";
import type { TIconName, TIconProps, TIconVariant } from "~/molecules/icon";
import type { TTab } from "./types";

const tabIcon = <T extends TIconVariant>(name: TIconName<T>): TIconProps<T> => {
  return {
    name,
    size: 24,
    variant: "outline" as T,
    color: "#000000"
  };
}

export const tabs: TTab[] = [
  {
    id: uuid.v4(),
    name: "agora",
    route: "/(public)/(tabs)",
    icon: tabIcon("agora")
  },
  {
    id: uuid.v4(),
    name: "Explore",
    route: "/explore",
    icon: tabIcon("explore")
  },
  {
    id: uuid.v4(),
    name: "Events",
    route: "/calendar",
    icon: tabIcon("events")
  },
  {
    id: uuid.v4(),
    name: "Profile",
    route: "/profile",
    icon: tabIcon("profile2")
  },
];
