import { DATA } from "@/components/organisms/carousel/data";
import { Card } from "heroui-native";
import { Image, Text, StyleSheet, useWindowDimensions, View } from "react-native";
import { Image as ExpoImage } from "expo-image";
import PagerView from "react-native-pager-view";

export default function ExploreScreen() {
  const { height, width } = useWindowDimensions();

  const FOCUSED_HEIGHT = height * 0.6;
  const PEEK_HEIGHT = height * 0.15;
  const ITEM_GAP = 16;
  const SNAP_INTERVAL = FOCUSED_HEIGHT + ITEM_GAP;

  return (
    <View className="flex-1">
      <PagerView className="flex-1">
        {DATA.map((item) => (
          <View key={item.id} className="overflow-hidden">
            <Card style={{ height: FOCUSED_HEIGHT, width }}>
              <ExpoImage
                source={{ uri: item.imageUri }}
                className="inset-0 absolute object-cover"
                style={StyleSheet.absoluteFill}
              />
              <Card.Title>{item.title}</Card.Title>
            </Card>
          </View>
        ))}
      </PagerView>
    </View>
  );
}
