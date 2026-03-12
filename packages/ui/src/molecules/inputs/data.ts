import type { IconName, UITextfieldItem } from "./types";

export const uITextfieldSeeds: UITextfieldItem[] = [
  {
    id: "seed-inputs-1",
    placeholder: "Enter your email",
    label: "Email",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "seed-inputs-2",
    placeholder: "Enter your password",
    label: "Password",
    error: "Password must be at least 8 characters",
    isInvalid: true,
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: "seed-inputs-3",
    placeholder: "Search…",
    createdAt: "2024-01-03T00:00:00.000Z",
  },
];

const getIcon = async (iconName: IconName) => {
  const { [iconName]: icon } = await import(`iconsax-react-nativejs`);
  return icon;
};

export { getIcon };
