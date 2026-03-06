import type { InputProps, LabelProps, TextFieldRootProps } from "heroui-native";

export type UITextfieldProps<T extends InputProps = InputProps> = T & TextFieldRootProps & {
  labelProps?: Omit<LabelProps, "children"> & { value: string };
  inputProps?: T;
  error?: string;
};

export type UITextfieldItem = {
  id: string;
  placeholder: string;
  label?: string;
  error?: string;
  isInvalid?: boolean;
  createdAt: string;
};
