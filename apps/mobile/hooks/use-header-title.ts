import useCurrentTab from "./use-current-tab";

const useHeaderTitle = () => {
  const { isHomeTab, lastSegment } = useCurrentTab();
  if (isHomeTab) return "Home";

  return lastSegment ? lastSegment : "Philagora";
};

export default useHeaderTitle;
