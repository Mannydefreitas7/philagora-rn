import {Redirect} from "expo-router";
import useSessionStore from "@/stores/session";

export default function Index() {
    const isLoggedIn = useSessionStore((state) => state.isLoggedIn);

    if (!isLoggedIn) {
        return <Redirect href="/login"/>;
    }
    return (
        <Redirect href="/home"/>
    );
}
