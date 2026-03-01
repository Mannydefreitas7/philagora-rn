import { FlatList, ViewabilityConfig, ViewToken } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useUserStore } from "@/stores/user";
import useSpacing from "@/hooks/use-spacing";
import { v4 } from "react-native-uuid/dist/v4";
import { SPACING } from "@/constants/size";
import { HEADER } from "@/constants/navigation";
import { useCallback, useMemo, useState } from "react";
import { Session } from "@/types/session";
import { Debate } from "@/types/debate";
import { Card } from "@/components/molecules/card";
import { useSharedValue } from "react-native-reanimated";

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
  const { top, bottom } = useSafeAreaInsets();
  const userId = useUserStore((state) => state.user?.id ?? "");
  const { primaryCardHeight, secondaryCardHeight, tabHeight, headerHeight } = useSpacing();
  const offsets = DATA.map((item, index) => index * 100);
  const [currentItem, setCurrentItem] = useState<(typeof DATA)[number] | null>(null);
  const animatedHeight = useSharedValue(primaryCardHeight);
  const viewabilityConfig = useMemo<ViewabilityConfig>(() => {
    return {
      waitForInteraction: false,
      itemVisiblePercentThreshold: 90,
    };
  }, []);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<(typeof DATA)[number]>[] }) => {
      const current = viewableItems.find((v) => v.isViewable);
      if (current) {
        console.log("Current item:", current.item);
        setCurrentItem(current.item);
      }
    },
    [],
  );

  const renderItem = ({ item, index }: { item: (typeof DATA)[number]; index: number }) => {
    const session: Session<Debate> = {
      id: v4(),
      title: item.name,
      image: item.image.uri,
      type: "debate",
      createdAt: new Date(),
      updatedAt: new Date(),
      startedAt: new Date(),
      host: [],
      channels: [],
      description: item.artist,
      participants: [],
    };
    return <Card active={currentItem?.id === session.id} item={session} key={index} height={animatedHeight} />;
  };

  return (
    <>
      <FlatList
        data={DATA.map((item) => ({ ...item, id: v4() }))}
        className="bg-neutral-900"
        pagingEnabled
        alwaysBounceVertical
        scrollEnabled={false}
        initialNumToRender={2}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        contentInset={{ top: headerHeight - HEADER.spacing.paddingVertical, bottom: tabHeight }}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="px-4 gap-4"
        renderItem={renderItem}
        pinchGestureEnabled={false}
        directionalLockEnabled
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
}
