import type { ITab } from "@repo/typings";
import type { TabTriggerSlotProps } from "expo-router/ui";
import type { TIconProps, TIconVariant } from "~/molecules/icon";

export type TabButtonProps<V extends TIconVariant> = TabTriggerSlotProps & {
  icon: TIconProps<V>;
  label: ITab["name"];
  color: string;
  activeColor: string;
};
