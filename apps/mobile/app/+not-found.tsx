import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-lg">Skärmen du letar efter finns inte.</Text>
        <Link href="/" className="mt-4 py-4">
          <Text className="text-md">Gå till start</Text>
        </Link>
      </View>
    </>
  );
}
