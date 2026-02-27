import VerticalCarousel from "@/components/molecules/carousel";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Uniwind } from "uniwind";

export default function HomeScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Uniwind.setTheme("dark");
  }, []);

  return (
    <View>
      <VerticalCarousel />
    </View>
  );
}
