import { iconList } from "./data";
import type { TBaseIconName, TKey } from "./types";
import type { TIconProps } from "../../types";

function InternalIcon(props: TIconProps) {
  const getIcon = (name: TBaseIconName) => {
    if (!iconList[name as TKey]) throw new Error(`No iconName ${name} found in iconList`);
    return iconList[name as TKey];
  };

  const IconComponent = getIcon(props.name);
  if (IconComponent) {
    return <IconComponent {...props} />

  };
}

export default InternalIcon;
