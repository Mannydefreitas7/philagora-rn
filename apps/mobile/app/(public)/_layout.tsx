import { Header, Icon, useBottomBar } from "@repo/ui";
import { Stack, usePathname } from "expo-router";
import { useColor } from "@/hooks/use-color";
import useCurrentTab from "@/hooks/use-current-tab";
import useSpacing from "@/hooks/use-spacing";

export default function PublicLayout() {
  const { currentRoute, isHomeTab } = useCurrentTab();
  const route = usePathname();
  const { activeTab } = useBottomBar(route);
  const { tabColor } = useColor({ scheme: "dark", condition: isHomeTab });
  const { headerHeight } = useSpacing();

  const renderIcon = () => <Icon name={activeTab?.icon.name} size={24} color="#000" variant="outline" />;

  return (
    <Stack initialRouteName="login">
      <Stack.Screen
        name="login"
        options={{
          presentation: "fullScreenModal",
          animation: "fade",
          animationDuration: 200,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          animationMatchesGesture: true,
          animation: "fade",
          animationDuration: 200,
          presentation: "fullScreenModal",
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerShown: true,
        }}
      />
      <Stack.Screen name="(tabs)">
        <Stack.Header asChild>
          <Header title={currentRoute} icon={renderIcon()} textColor={tabColor} height={headerHeight} />
        </Stack.Header>
      </Stack.Screen>
    </Stack>
  );
}
