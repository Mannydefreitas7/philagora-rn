import { BottomSheet, useBottomSheet } from "heroui-native/bottom-sheet";
import { Button, type ButtonRootProps } from "heroui-native/button";
import type { IconProps } from "iconsax-react-nativejs";
import { useCallback } from "react";
import { View } from "react-native";

/**
 * Props for creating a bottom sheet button via the `useBottomSheetButton` hook.
 *
 * - `component`: React node that will be rendered inside the sheet content.
 * - `title`: Title text shown in the bottom sheet header and used as default label for the trigger.
 * - `description`: Optional descriptive text shown under the title inside the sheet.
 *
 * Note: the `onChange` shape is described here for consumptive documentation; the hook
 * implementation also exposes an `onChange` function matching this signature.
 */
type TUseBottomSheetButton = {
	modal?: {
		title: string;
		component: React.ReactNode;
		description: string;
		snapPoints?: string[];
	};
};

/**
 * Props for the BottomSheetButton component.
 *
 * This composes TUseBottomSheetButton and a Trigger component which should be a
 * - `Trigger`: Button root-compatible React functional component.
 * - `onChange`: Callback signature describing the sheet state; returns either "opened" or "closed".
 */
type TProps = TUseBottomSheetButton & {
	Trigger: React.FC<ButtonRootProps>;
	onChange?: (open: boolean) => "opened" | "closed";
};

/**
 * BottomSheetButton
 *
 * Presentational wrapper that renders:
 * - A trigger (provided via the `Trigger` prop) that toggles the sheet.
 * - A bottom sheet Portal containing overlay, content, header (title/description), and the supplied component.
 *
 * @param props.modal.component - The content to render inside the bottom sheet.
 * @param props.modal.title - Optional title rendered in the sheet header.
 * @param props.modal.description - Optional description rendered in the sheet header.
 * @param props.Trigger - Trigger component used to open the sheet.
 *
 * @returns JSX.Element rendering the bottom sheet and its trigger.
 */
const BottomSheetButton = ({ modal, Trigger }: TProps) => {
	return (
		<BottomSheet>
			<BottomSheet.Trigger asChild>
				<Trigger />
			</BottomSheet.Trigger>
			<BottomSheet.Portal>
				<BottomSheet.Overlay isCloseOnPress className="flex-1 bg-neutral-950/90 backdrop-blur-lg" />
				<BottomSheet.Content
					backgroundClassName="rounded-[48px] bg-white dark:bg-neutral-900"
					snapPoints={modal?.snapPoints}
					enableDynamicSizing={!modal?.snapPoints}
					detached
					bottomInset={16}
					handleClassName="h-4"
					className="mx-4 pt-1">
					<View className="flex-row justify-between relative">
						<View className="flex-col px-3">
							{modal?.title && (
								<BottomSheet.Title className="text-black dark:text-white text-lg font-bold">
									{modal.title}
								</BottomSheet.Title>
							)}
							{modal?.description && (
								<BottomSheet.Description className="text-neutral-500 text-2xs">
									{modal.description}
								</BottomSheet.Description>
							)}
						</View>
						<BottomSheet.Close className="absolute right-0 -top-5" size="sm" feedbackVariant="scale-ripple" />
					</View>
					<View className="mx-2 mt-4">{modal?.component}</View>
				</BottomSheet.Content>
			</BottomSheet.Portal>
		</BottomSheet>
	);
};

/**
 * @private Button helper for the bottom sheet.
 * InternalTriggerButton
 *
 * Small adapter used as a default Trigger for BottomSheetButton. It renders
 * a `Button` from the design system and optionally an icon.
 *
 * @param props.isIconOnly - When true, render only the icon (no label).
 * @param props.Icon - Optional icon component to render inside the button.
 * @param props.* - Any other ButtonRootProps forwarded to the underlying Button.
 *
 * @returns JSX.Element a Button configured with icon and/or label.
 */
const InternalTriggerButton = ({
	isIconOnly,
	Icon,
	onChange,
	children,
	...props
}: Pick<ButtonRootProps, "isIconOnly" | "variant" | "feedbackVariant" | "children"> & {
	Icon?: React.FC<IconProps>;
	onChange: (open: boolean) => void;
}) => {
	const { isOpen, onOpenChange } = useBottomSheet();
	const handleOnChange = useCallback(() => {
		onOpenChange(true);
		onChange(isOpen);
	}, [isOpen]);
	return (
		<Button {...props} onPress={handleOnChange}>
			{Icon && !isIconOnly && <Icon />}
			{Icon && isIconOnly ? <Icon /> : <Button.Label>{children}</Button.Label>}
		</Button>
	);
};

/**
 * useBottomSheetButton
 *
 * Hook that ties together bottom sheet state and a ready-to-render Trigger button.
 * It uses the library's `useBottomSheet` hook to read/open the sheet and returns:
 *
 * - `TriggerButton`: A JSX element containing the configured BottomSheet and its trigger.
 * - `onChange`: A callback that returns the current sheet state as "opened" | "closed".
 *
 * @param params.component - The React node to render inside the sheet content.
 * @param params.modal - Modal configuration object.
 *
 * @returns An object with `TriggerButton` (JSX) and `onChange` (state inspector).
 */
const useBottomSheetButton = ({ modal }: TUseBottomSheetButton) => {
	const onChange = useCallback((isOpen: boolean): "opened" | "closed" => {
		return isOpen ? "opened" : "closed";
	}, []);

	const TriggerButton = ({ ...props }: ButtonRootProps) => (
		<BottomSheetButton
			{...props}
			modal={modal}
			Trigger={() => <InternalTriggerButton {...props} onChange={onChange} />}
			onChange={onChange}
		/>
	);

	return {
		TriggerButton,
		onChange,
	};
};

export { BottomSheetButton, useBottomSheetButton };
