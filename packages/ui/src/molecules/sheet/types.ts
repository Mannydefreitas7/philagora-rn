import type { ButtonRootProps } from "heroui-native";

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
export type TUseBottomSheetButton = {
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
export type TProps = TUseBottomSheetButton & {
  Trigger: React.FC<ButtonRootProps>;
  onChange?: (open: boolean) => "opened" | "closed";
};
