import { Card, Button, Chip } from "heroui-native";
import React, { useEffect } from "react";
import { FlatList, Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";
import DebateLikeButton from "@/features/debate/like";
import { useUserStore } from "@/stores/user";
import { useNavigation } from "expo-router";

const DATA = [
  {
    id: "1",
    name: "Debate: Subject 1 vs Subject 2",
    artist: "Dr. John and Dr. Phil",
    year: "2018",
    image: {
      uri: "https://i.pinimg.com/1200x/18/e6/e8/18e6e8e2d2b8c5b4dd77a4ae705bf96a.jpg",
    },
  },
  {
    id: "2",
    name: "Debate: Subject 3 vs Subject 4",
    artist: "Dr. John and Dr. Phil",
    year: "2013",
    image: {
      uri: "https://i.pinimg.com/1200x/91/52/b2/9152b2dc174934279cda4509b0931434.jpg",
    },
  },
  {
    id: "3",
    name: "Debate: Subject 5 vs Subject 6",
    artist: "Dr. John and Dr. Phil",
    year: "2015",
    image: {
      uri: "https://i.pinimg.com/1200x/1e/38/7f/1e387f131098067f7a9be0bc68b0b6f2.jpg",
    },
  },
  {
    id: "4",
    name: "Debate: Subject 7 vs Subject 8",
    artist: "Dr. John and Dr. Phil",
    year: "2010",
    image: {
      uri: "https://i.pinimg.com/736x/43/e0/e0/43e0e0a542c0ccfbc5cf1b802bcf2d66.jpg",
    },
  },
];

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const userId = useUserStore((state) => state.user?.id ?? "");

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Home",
      headerTintColor: "white",
    });
  }, [navigation]);

  const renderItem = ({ item, index }: { item: (typeof DATA)[number]; index: number }) => (
    <Card key={index} className="rounded-3xl h-96 my-2">
      <Image source={{ uri: item.image.uri }} className="absolute inset-0" />
      <View className="bg-black/50 absolute inset-0" />
      <View className="gap-4 items-start justify-end flex-col flex-1 h-full p-3 relative">
        <Chip variant="soft" color="danger" size="md" className="absolute top-1 right-1">
          Live
        </Chip>
        <Card.Body>
          <View className="gap-1 mt-6">
            <Card.Title className="text-white font-bold">{item.name}</Card.Title>
            <Card.Title className="text-sm">{item.artist}</Card.Title>
          </View>
          <Card.Description>Join the debate now.</Card.Description>
        </Card.Body>
        <Card.Footer className="gap-3 flex-row w-full justify-between items-center">
          <Button size="sm" variant="secondary">
            Join
          </Button>
          <DebateLikeButton debateId={item.id} userId={userId} />
        </Card.Footer>
      </View>
    </Card>
  );

  return (
    <View>
      <FlatList
        data={DATA}
        pagingEnabled
        centerContent
        contentInset={{ top }}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="px-4"
        fadingEdgeLength={DATA.length}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
