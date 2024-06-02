import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Typography } from "@components/Typography";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Typography variant="title">
          Skärmen du letar efter finns inte.
        </Typography>
        <Link href="/" style={styles.link}>
          <Typography variant="subtitle" color="primary">
            Gå till start
          </Typography>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
