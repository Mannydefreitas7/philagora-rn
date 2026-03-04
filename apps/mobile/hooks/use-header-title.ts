import { tabs } from "@/constants/navigation";
import useCurrentTab from "./use-current-tab";

const useHeaderTitle = () => {
	const { isHomeTab, lastSegment, current } = useCurrentTab();
	const titles = tabs.map((tab) => tab.name);
	const currentIndex = titles.indexOf(lastSegment);
	return {
		title: isHomeTab ? "Agora" : current?.name ? current.name : "Philagora",
		titles,
		index: currentIndex,
		icon: current?.icon ?? ("home" as (typeof tabs)[number]["icon"]),
	};
};

export default useHeaderTitle;
