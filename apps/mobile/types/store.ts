import { ISheet } from "./navigation";

export interface ISheetStore {
  sheet: ISheet | null;
  setSheet: (sheet: ISheet | null) => void;
  component: React.ReactNode | null;
  opened: boolean;
  open: (sheet: ISheet | null) => void;
  close: () => void;
}
