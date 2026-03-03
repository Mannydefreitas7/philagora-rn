import { tabs } from "@/constants/navigation";
import useCurrentTab from "./use-current-tab";

const useHeaderTitle = () => {
  const { isHomeTab, lastSegment, current } = useCurrentTab();

  if (isHomeTab) return { title: "Agora", icon: "home" as (typeof tabs)[number]["icon"] };

  return {
    title: lastSegment ? lastSegment : "Philagora",
    icon: current?.icon ?? ("home" as (typeof tabs)[number]["icon"]),
  };
};

export default useHeaderTitle;
