
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Details() {
  const t = useGlobalSearchParams();
  const x = useLocalSearchParams();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>HI 123 gsdhkjkjsdkjhklj 123 {t.user} {x.name}</Text>
    </View>
  );
}
