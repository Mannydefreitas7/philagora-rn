import type {
  InputProps,
  LabelProps,
  TextFieldRootProps,
} from "heroui-native";
import type * as icons from "iconsax-react-nativejs";
import type { FC } from "react";

export type IconName = keyof typeof icons;
export type UITextfieldProps<T extends InputProps = InputProps> = T &
  TextFieldRootProps & {
    labelProps?: Omit<LabelProps, "children"> & { value: string };
    inputProps?: T;
    prefix?: IconName;
    suffix?: IconName;
    onSuffixPress?: () => void;
    valid?: boolean;
    error?: string;
  };

export type UITextfieldItem = {
  id: string;
  placeholder: string;
  label?: string;
  error?: string;
  valid?: boolean;
  isInvalid?: boolean;
  createdAt: string;
};
