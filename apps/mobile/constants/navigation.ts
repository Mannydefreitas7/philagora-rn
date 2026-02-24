import { ITab } from "@/types/navigation";
import uuid from "react-native-uuid";

export const tabs: ITab[] = [
  {
    id: uuid.v4(),
    name: "home",
    route: "/",
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
