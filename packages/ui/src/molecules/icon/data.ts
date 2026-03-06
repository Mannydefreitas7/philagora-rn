import * as icons from "../../base/icons";

const ICONS: Record<keyof typeof icons, (typeof icons)[keyof typeof icons]> = { ...icons };
export { ICONS as iconList };
