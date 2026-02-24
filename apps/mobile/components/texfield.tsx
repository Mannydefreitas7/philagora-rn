import { FieldError, Input, InputProps, Label, LabelProps, TextField, TextFieldRootProps } from "heroui-native"

type UITextfieldProps<T extends InputProps = InputProps> = T & TextFieldRootProps & {
  labelProps?: Omit<LabelProps, 'children'> & { value: string };
  inputProps?: T;
  error?: string;
};

const UITextfield = ({ inputProps, error, labelProps, ...props }: UITextfieldProps) => {


  return (
    <TextField { ...props }>
      {labelProps && <Label {...labelProps} children={labelProps.value} />}
      <Input
        {...inputProps }
      />
      {props.isInvalid && error ? (
        <FieldError>{error}</FieldError>
      ) : null}
    </TextField>
  )
}

export default UITextfield;
