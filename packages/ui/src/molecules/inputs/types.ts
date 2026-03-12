import type {
	ButtonLabelProps,
	InputGroupSuffixProps,
	InputProps,
	LabelProps,
	TextFieldRootProps,
} from "heroui-native";
import type * as icons from "iconsax-react-nativejs";
import type { ReactNode } from "react";

type IconName = keyof typeof icons;
export type UITextfieldProps<T extends InputProps = InputProps> = T &
	TextFieldRootProps & {
		labelProps?: Omit<LabelProps, "children"> & { value: string };
		inputProps?: T;
		prefix?: IconName;
		suffix?: ReactNode | IconName | InputGroupSuffixProps;
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
