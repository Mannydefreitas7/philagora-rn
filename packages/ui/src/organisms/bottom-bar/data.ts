import uuid from "react-native-uuid";
import type { TBaseIconName, TIconName, TIconProps, TIconVariant } from "../../molecules/icon";
import type { TTab } from "./types";

const tabIcon = <T extends TIconVariant>(name: TBaseIconName): TIconProps => {
  return {
    name,
    size: 24,
    variant: "outline" as T,
    color: "#000000",
  };
};

export const tabs: TTab[] = [
  {
    id: uuid.v4(),
    name: "agora",
    route: "/(public)/(tabs)",
    icon: tabIcon("Agora"),
  },
  {
    id: uuid.v4(),
    name: "Explore",
    route: "/explore",
    icon: tabIcon("Explore"),
  },
  {
    id: uuid.v4(),
    name: "Events",
    route: "/calendar",
    icon: tabIcon("Events"),
  },
  {
    id: uuid.v4(),
    name: "Profile",
    route: "/profile",
    icon: tabIcon("Profile"),
  },
];
