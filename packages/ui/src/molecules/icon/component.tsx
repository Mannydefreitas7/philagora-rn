import Animated, { StretchInX, StretchOutX } from "react-native-reanimated";
import { iconList } from "./data";
import type { TBaseIconName, TIconProps, TKey } from "./types";

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
