import { AnimatePresence, Motion } from "@legendapp/motion";
import { FieldError, Input, Label, TextField } from "heroui-native";
import type { UITextfieldProps } from "./types";

const UITextfield = ({ inputProps, error, labelProps, ...props }: UITextfieldProps) => {
  return (
    <TextField {...props}>
      {labelProps && (
        <Label {...labelProps}>
          <Label.Text className="text-sm text-neutral-700 dark:text-neutral-200 ml-2 mb-0">
            {labelProps.value}
          </Label.Text>
        </Label>
      )}
      <Input
        {...inputProps}
        className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-accent error:border-danger rounded-full px-4"
        placeholder={props.placeholder}
      />
      <AnimatePresence>
        {props.isInvalid && error ? (
          <Motion.View
            key={props.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              default: {
                type: "spring",
              },
              opacity: {
                type: "spring",
              },
            }}
            exit={{ opacity: 0, y: -20 }}>
            <FieldError>{error}</FieldError>
          </Motion.View>
        ) : null}
      </AnimatePresence>
    </TextField>
  );
};

export { UITextfield };
