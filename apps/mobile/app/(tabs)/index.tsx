import React from "react";
import { StyleSheet, View } from "react-native";

import { Typography } from "@components/Typography";

export default function StandpointsScreen() {
  return (
    <View style={styles.container}>
      <Typography variant="title">Home</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
