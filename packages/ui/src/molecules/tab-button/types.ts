import type { ITab } from "@repo/typings";
import type { TabTriggerSlotProps } from "expo-router/ui";
import type { TIconProps } from "../icon";

export type TabButtonProps = TabTriggerSlotProps & {
  icon: TIconProps;
  label: ITab["name"];
  color: string;
  activeColor: string;
};
