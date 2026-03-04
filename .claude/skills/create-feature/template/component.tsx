/**
 * @file component.tsx — React Native UI component for this feature.
 *
 * RULES (enforced, no exceptions):
 * - Use `function` declarations — never `const Component = () =>`.
 * - Export as `default` only (barrel re-exports named form from index.ts).
 * - Component name: `<Feature>Feature` (PascalCase + "Feature" suffix).
 * - All layout and styling via Tailwind utility classes (`className="..."`) — NO StyleSheet.create.
 * - HeroUI Native (`heroui-native`) components are the primary UI building blocks
 *   (Button, Input, etc.). Use react-native View/Text only for structural containers.
 * - All form state lives in the Zustand-X store — never use useState for form fields.
 * - Call Supabase via store actions only — never import supabase directly here.
 * - Import store from `./store` (relative), types from `./types`.
 * - Error message renders conditionally below form fields, never in an alert/toast.
 * - Disable/show loading state on the submit button while `submitting` is true.
 *
 * ZUSTAND-X HOOKS IN COMPONENTS:
 * - Read a value:  `const values = useStoreValue(use<Feature>Store, "values")`
 * - Bind input:    `const [title, setTitle] = useStoreState(use<Feature>Store, "title")`
 * - Call action:   `use<Feature>Store.set("setField", "title", newValue)`
 * - Call action:   `use<Feature>Store.set("createDebate")`
 * Do NOT call `use<Feature>Store()` as a hook — it is a store object, not a React hook.
 *
 * IMPORT ORDER:
 * 1. React (if hooks needed)
 * 2. React Native primitives (View, Text, etc.)
 * 3. zustand-x hooks (useStoreValue, useStoreState)
 * 4. HeroUI Native components
 * 5. Internal hooks / navigation (@/hooks/*, expo-router)
 * 6. Local store and types (./store, ./types)
 *
 * @example
 * ```tsx
 * import { View, Text } from "react-native";
 * import { useStoreValue } from "zustand-x";
 * import { Button, Input } from "heroui-native";
 * import { useRouter } from "expo-router";
 *
 * import useDebateStore from "./store";
 *
 * export default function DebateFeature() {
 *   const values = useStoreValue(useDebateStore, "values");
 *   const submitting = useStoreValue(useDebateStore, "submitting");
 *   const error = useStoreValue(useDebateStore, "error");
 *   const router = useRouter();
 *
 *   const onSubmit = async () => {
 *     const { error: actionError } = await useDebateStore.set("createDebate");
 *     if (actionError) return;
 *     router.replace("/(public)/(tabs)/");
 *   };
 *
 *   return (
 *     <View className="flex-1 bg-background px-5 py-8">
 *       <Input
 *         label="Title"
 *         value={values.title}
 *         onChangeText={(v) => useDebateStore.set("setField", "title", v)}
 *       />
 *
 *       {error ? (
 *         <Text className="mt-3 text-sm text-danger">{error}</Text>
 *       ) : null}
 *
 *       <View className="mt-8">
 *         <Button variant="solid" onPress={onSubmit} isDisabled={submitting}>
 *           {submitting ? "Saving..." : "Create Debate"}
 *         </Button>
 *       </View>
 *     </View>
 *   );
 * }
 * ```
 */
