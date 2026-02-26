import {Slot} from "expo-router";
import {View} from "react-native";

export default function PublicLayout() {

    return (
        <View className="bg-white dark:bg-neutral-950 flex-1">
            <Slot/>
        </View>
    );
}
