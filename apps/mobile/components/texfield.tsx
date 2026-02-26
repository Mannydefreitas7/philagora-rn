import {FieldError, Input, InputProps, Label, LabelProps, TextField, TextFieldRootProps} from "heroui-native"

type UITextfieldProps<T extends InputProps = InputProps> = T & TextFieldRootProps & {
    labelProps?: Omit<LabelProps, 'children'> & { value: string };
    inputProps?: T;
    error?: string;
};

const UITextfield = ({inputProps, error, labelProps, ...props}: UITextfieldProps) => {


    return (
        <TextField {...props} >
            {labelProps &&
                <Label {...labelProps} >
                    <Label.Text
                        className="text-sm text-neutral-700 dark:text-neutral-200 ml-2 mb-0">{labelProps.value}</Label.Text>
                </Label>}
            <Input
                {...inputProps}
                className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                placeholder={props.placeholder}
            />
            {props.isInvalid && error ? (
                <FieldError>{error}</FieldError>
            ) : null}
        </TextField>
    )
}

export default UITextfield;
