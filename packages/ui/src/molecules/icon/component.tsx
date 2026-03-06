import { iconList } from "./data";
import type { TBaseIconName, TIconProps } from "./types";

function InternalIcon(props: TIconProps) {
  const getIcon = (name: TBaseIconName) => {
    if (!iconList[name]) throw new Error(`No iconName ${name} found in iconList`);
    return iconList[name as keyof typeof iconList];
  };

  const IconComponent = getIcon(props.name);
  if (IconComponent) return <IconComponent {...props} />;
}

export default InternalIcon;
