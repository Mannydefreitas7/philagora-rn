import useSessionStore from "@/stores/session";
import { Redirect } from "expo-router";

export default function Index() {
  const isLoggedIn = useSessionStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Redirect href="/" />;
  }

  return <Redirect href="/login" />;
}
