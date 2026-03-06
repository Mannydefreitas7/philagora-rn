import { iconList } from "./data";
import type { TBaseIcon, TBaseIconName, TIconName, TIconProps, TIconVariant } from "./types";

function InternalIcon<Variant extends TIconVariant>(props: TIconProps<Variant>) {
  const getIcon = (name: TIconName<Variant>) => {
    const icons = Object.keys(iconList).map((key) => key.toLowerCase()) as TIconName<Variant>[];
    if (!icons) throw new Error("No icons found in iconList");
    for (const iconName in iconList) {
      if (iconName.toLowerCase() !== name) throw new Error("No icons found in iconList");
      return iconList[iconName as TBaseIconName] as TBaseIcon;
    }
  }

  const IconComponent = getIcon(props.name)
  return <IconComponent {...props} />;
}

export default InternalIcon;
