import useCurrentTab from "./use-current-tab";

const useHeaderTitle = () => {
  const { isHomeTab, lastSegment } = useCurrentTab();
  if (isHomeTab) return "Agora";

  return lastSegment ? lastSegment : "Philagora";
};

export default useHeaderTitle;
