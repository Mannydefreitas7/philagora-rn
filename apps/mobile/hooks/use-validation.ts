import {useCallback, useMemo, useState} from "react";

/**
 * Primitive types that can be used as form field values.
 */
type Primitive = string | number | null | undefined;

/**
 * Form values object where each key represents a field name and value is a primitive.
 */
type FormValues = Record<string, Primitive>;

/**
 * Represents a validation error message, or undefined if no error.
 */
export type ValidationError = string | undefined;

/**
 * Object containing validation errors for form fields.
 */
export type ValidationErrors<T extends FormValues> = Partial<Record<keyof T, string>>;

/**
 * Function that validates a single field value and returns an error message if invalid.
 * @param value - The field value to validate
 * @param values - All form values for cross-field validation
 * @returns Error message or undefined if valid
 */
export type ValidationRule<T extends FormValues> = (value: string, values: T) => ValidationError;

/**
 * Schema defining validation rules for each form field.
 */
export type ValidationSchema<T extends FormValues> = Partial<Record<keyof T, ValidationRule<T>[]>>;

/**
 * Regular expression for validating email addresses.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Converts a primitive value to a trimmed string for validation.
 * @param value - The primitive value to convert
 * @returns Trimmed string representation
 */
function toInputValue(value: Primitive): string {
    return String(value ?? "").trim();
}

/**
 * Runs validation rules sequentially and returns the first error encountered.
 * @param value - The field value to validate
 * @param values - All form values
 * @param rules - Array of validation rules to apply
 * @returns First error message or undefined if all rules pass
 */
function runRules<T extends FormValues>(value: string, values: T, rules: ValidationRule<T>[] = []): ValidationError {
    for (const rule of rules) {
        const error = rule(value, values);
        if (error) return error;
    }
    return undefined;
}

/**
 * Pre-built validation rules for common form field validations.
 *
 * @example
 * ```ts
 * const schema = {
 *   email: [validationRules.required("Email"), validationRules.email()],
 *   password: [validationRules.required("Password"), validationRules.minLength(8, "Password")],
 * };
 * ```
 */
export const validationRules = {
    /**
     * Validates that a field is not empty.
     * @param label - Field label for error message (default: "This field")
     * @returns Validation rule function
     */
    required:
        <T extends FormValues>(label = "This field"): ValidationRule<T> =>
            (value) =>
                value.length === 0 ? `${label} is required.` : undefined,

    /**
     * Validates email format.
     * @param label - Field label for error message (default: "Email")
     * @returns Validation rule function
     */
    email:
        <T extends FormValues>(label = "Email"): ValidationRule<T> =>
            (value) =>
                value.length > 0 && !EMAIL_REGEX.test(value) ? `Please enter a valid ${label.toLowerCase()}.` : undefined,

    /**
     * Validates minimum length requirement.
     * @param length - Minimum required length
     * @param label - Field label for error message (default: "This field")
     * @returns Validation rule function
     */
    minLength:
        <T extends FormValues>(length: number, label = "This field"): ValidationRule<T> =>
            (value) =>
                value.length > 0 && value.length < length ? `${label} must be at least ${length} characters.` : undefined,

    /**
     * Validates maximum length constraint.
     * @param length - Maximum allowed length
     * @param label - Field label for error message (default: "This field")
     * @returns Validation rule function
     */
    maxLength:
        <T extends FormValues>(length: number, label = "This field"): ValidationRule<T> =>
            (value) =>
                value.length > length ? `${label} must be at most ${length} characters.` : undefined,

    /**
     * Validates that a field matches another field's value (e.g., password confirmation).
     * @param otherField - The field to match against
     * @param message - Custom error message (default: "Values do not match.")
     * @returns Validation rule function
     */
    matchesField:
        <T extends FormValues>(otherField: keyof T, message = "Values do not match."): ValidationRule<T> =>
            (value, values) =>
                value !== toInputValue(values[otherField]) ? message : undefined,
};


/**
 * Custom hook for form validation with real-time field and form-level validation.
 *
 * @template T - Form values type extending FormValues
 * @param values - Current form values object
 * @param schema - Validation schema defining rules for each field
 *
 * @returns Object containing:
 * - `errors` - Current validation errors for each field
 * - `hasErrors` - Boolean indicating if any errors exist
 * - `validateField` - Function to validate a single field
 * - `validateForm` - Function to validate all fields in the schema
 * - `clearFieldError` - Function to clear error for a specific field
 * - `resetErrors` - Function to clear all errors
 *
 * @example
 * ```tsx
 * const [values, setValues] = useState({ email: "", password: "" });
 * const schema = {
 *   email: [validationRules.required("Email"), validationRules.email()],
 *   password: [validationRules.required("Password"), validationRules.minLength(8, "Password")],
 * };
 *
 * const { errors, validateField, validateForm, hasErrors } = useValidation(values, schema);
 *
 * const handleSubmit = () => {
 *   if (validateForm()) {
 *     // Submit form
 *   }
 * };
 * ```
 */
export function useValidation<T extends FormValues>(values: T, schema: ValidationSchema<T>) {
    const [errors, setErrors] = useState<ValidationErrors<T>>({});
    const [isValid, setIsValid] = useState(false);

    const validateField = useCallback(
        (field: keyof T) => {
            const rules = schema[field] ?? [];
            const fieldValue = toInputValue(values[field]);
            const nextError = runRules(fieldValue, values, rules);

            setErrors((prev) => {
                if (!nextError && !(field in prev)) return prev;
                return {
                    ...prev,
                    [field]: nextError,
                };
            });

            return !nextError;
        },
        [schema, values],
    );

    const validateForm = useCallback(() => {
        const nextErrors: ValidationErrors<T> = {};

        for (const key of Object.keys(schema) as Array<keyof T>) {
            const rules = schema[key] ?? [];
            const fieldValue = toInputValue(values[key]);
            const nextError = runRules(fieldValue, values, rules);
            if (nextError) nextErrors[key] = nextError;
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }, [schema, values]);

    const clearFieldError = useCallback((field: keyof T) => {
        setErrors((prev) => {
            if (!(field in prev)) return prev;
            return {
                ...prev,
                [field]: undefined,
            };
        });
    }, []);

    const resetErrors = useCallback(() => {
        setErrors({});
    }, []);

    const hasErrors = useMemo(() => Object.values(errors).some(Boolean), [errors]);

    return {
        errors,
        hasErrors,
        validateField,
        validateForm,
        clearFieldError,
        resetErrors,
    };
}

export default useValidation;
