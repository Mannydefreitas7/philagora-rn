import { Card } from "heroui-native";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DATA } from "@/components/organisms/carousel/data";
import useSpacing from "@/hooks/use-spacing";

export default function ExploreScreen() {
	const { height, width } = useWindowDimensions();
	const { top } = useSafeAreaInsets();
	const { headerHeight } = useSpacing();

	const FOCUSED_HEIGHT = height * 0.6;
	const _PEEK_HEIGHT = height * 0.15;
	const ITEM_GAP = 16;
	const _SNAP_INTERVAL = FOCUSED_HEIGHT + ITEM_GAP;

	return (
		<View className="flex-1 justify-items-center" style={{ height }}>
			<PagerView
				initialPage={0}
				orientation="vertical"
				offscreenPageLimit={3}
				style={{
					flex: 1,
					justifyContent: "center",
					overflow: "scroll",
					maxHeight: FOCUSED_HEIGHT,
				}}
				pageMargin={20}
				overScrollMode="always">
				{DATA.map((item) => (
					<View key={item.id} className="h-full w-full">
						<Card variant="transparent" style={{ height: FOCUSED_HEIGHT }}>
							<Image
								source={{ uri: item.imageUri }}
								className="inset-0 absolute object-cover"
								style={StyleSheet.absoluteFill}
							/>
							<Card.Header></Card.Header>
							<Card.Body>
								<Card.Title>{item.title}</Card.Title>
							</Card.Body>
						</Card>
					</View>
				))}
			</PagerView>
		</View>
	);
}
