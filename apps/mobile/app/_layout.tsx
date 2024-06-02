import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

import { DarkTheme, LightTheme } from "@lib/navigationTheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const theme = useMemo(() => {
    if (colorScheme === "dark") {
      return DarkTheme;
    }
    return LightTheme;
  }, [colorScheme]);

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
