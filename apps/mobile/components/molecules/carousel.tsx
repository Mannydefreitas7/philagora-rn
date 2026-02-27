import { useState } from "react";
import MaterialCarousel from "../ui/molecules/material-carousel";
import { Dimensions, View } from "react-native";
import { VerticalPageCarousel } from "../ui/molecules/vertical-page-carousel";

const VerticalCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { height } = Dimensions.get("window");
  const DATA = [
    {
      id: "1",
      name: "MY DEAR MELANCHOLY",
      artist: "The Weeknd",
      year: "2018",
      image: {
        uri: "https://i.pinimg.com/1200x/18/e6/e8/18e6e8e2d2b8c5b4dd77a4ae705bf96a.jpg",
      },
    },
    {
      id: "2",
      name: "RANDOM ACCESS MEMORIES",
      artist: "Daft Punk",
      year: "2013",
      image: {
        uri: "https://i.pinimg.com/1200x/91/52/b2/9152b2dc174934279cda4509b0931434.jpg",
      },
    },
    {
      id: "3",
      name: "CURRENTS",
      artist: "Tame Impala",
      year: "2015",
      image: {
        uri: "https://i.pinimg.com/1200x/1e/38/7f/1e387f131098067f7a9be0bc68b0b6f2.jpg",
      },
    },
    {
      id: "4",
      name: "PLASTIC BEACH",
      artist: "Gorillaz",
      year: "2010",
      image: {
        uri: "https://i.pinimg.com/736x/43/e0/e0/43e0e0a542c0ccfbc5cf1b802bcf2d66.jpg",
      },
    },
  ];

  return (
    <VerticalPageCarousel
      data={DATA}
      itemHeight={height * 0.65}
      cardMargin={14}
      pagingEnabled
      cardSpacing={6}
      scaleRange={[0.88, 1, 0.88]}
      opacityRange={[0.6, 1, 0.6]}
      useBlur={true}
      renderItem={({ item }) => (
        <View>
          <View></View>
        </View>
      )}
    />
  );
};

export default VerticalCarousel;
