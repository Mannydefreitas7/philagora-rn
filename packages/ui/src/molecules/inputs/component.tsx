import { AnimatePresence, Motion } from "@legendapp/motion";
import { FieldError, InputGroup, Label, PressableFeedback, TextField, useThemeColor } from "heroui-native";
import type { IconProps } from "iconsax-react-nativejs";
import { type FC, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { getIcon } from "./data";
import type { UITextfieldProps } from "./types";

const UITextfield = ({ inputProps, error, labelProps, prefix, suffix, onSuffixPress, ...props }: UITextfieldProps) => {
  const [PrefixIcon, setPrefixIcon] = useState<FC<IconProps>>();
  const [SuffixIcon, setSuffixIcon] = useState<FC<IconProps>>();
  const theme = useColorScheme();
  const [successForeground, accentForeground] = useThemeColor(["success", "accent"]);

  useEffect(() => {
    if (prefix) {
      getIcon(prefix).then((icon) => {
        setPrefixIcon(icon);
      });
    }
  }, [prefix]);

  useEffect(() => {
    if (suffix) {
      getIcon(suffix).then((icon) => {
        setSuffixIcon(icon);
      });
    }
  }, [suffix]);
  return (
    <TextField {...props}>
      {labelProps && (
        <Label {...labelProps}>
          <Label.Text className="text-sm text-neutral-700 dark:text-neutral-200 ml-2 mb-0">
            {labelProps.value}
          </Label.Text>
        </Label>
      )}
      <InputGroup>
        {PrefixIcon && (
          <InputGroup.Prefix isDecorative className="pl-4">
            <PrefixIcon color={props.valid ? successForeground : accentForeground} variant="Outline" size={15} />
          </InputGroup.Prefix>
        )}
        <InputGroup.Input
          {...inputProps}
          data-valid={props.valid}
          secureTextEntry={props.secureTextEntry}
          onChangeText={props.onChangeText}
          onEndEditing={props.onEndEditing}
          className="bg-neutral-100  dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-accent error:border-danger rounded-full px-5 data-[valid=true]:border-green-500 overflow-hidden"
          placeholder={props.placeholder}
        />
        {SuffixIcon && (
          <InputGroup.Suffix className="pr-4">
            <PressableFeedback onPress={onSuffixPress}>
              <SuffixIcon color={theme === "dark" ? "white" : "black"} variant="Outline" size={14} />
            </PressableFeedback>
          </InputGroup.Suffix>
        )}
      </InputGroup>

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
