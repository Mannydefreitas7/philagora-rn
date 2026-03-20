import SignupFeature from "@/features/authentication/signup";
import { useWindowDimensions, View } from "react-native";
import { DOMComponent } from "@repo/ui";
import { WebView } from 'react-native-webview';

export const unstable_settings = {
  anchor: "login", // Anchor to the index route
};

export default function RegisterScreen() {

  const { width, height } = useWindowDimensions();

  return (
    <View className="flex-1">
      {/*<script type="module" src="https://cdn.spline.design/@splinetool/hana-viewer@1.2.51/hana-viewer.js"></script><hana-viewer url="https://prod.spline.design/de2BW6nSMDSzw5d7-THB/scene.hanacode"></hana-viewer>*/}
      <SignupFeature />
    </View>
  )
}
