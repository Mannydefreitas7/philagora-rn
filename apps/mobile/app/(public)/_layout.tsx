import { Header, Icon, useBottomBar } from "@repo/ui";
import { Stack, usePathname } from "expo-router";
import useCurrentTab from "@/hooks/use-current-tab";
import { useColor } from "@/hooks/use-color";

export default function PublicLayout() {
  const { currentRoute, isHomeTab } = useCurrentTab();
  const route = usePathname();
  const { activeTab } = useBottomBar(route);
  const { tabColor } = useColor({ scheme: 'dark', condition: isHomeTab });


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
          <Header title={currentRoute} icon={renderIcon()} textColor={tabColor} />
        </Stack.Header>
      </Stack.Screen>
    </Stack>
  );
}
