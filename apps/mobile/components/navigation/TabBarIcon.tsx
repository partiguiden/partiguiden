import Ionicons from "@expo/vector-icons/Ionicons";
import type { IconProps } from "@expo/vector-icons/build/createIconSet";
import type { ComponentProps } from "react";

export function TabBarIcon(
  props: IconProps<ComponentProps<typeof Ionicons>["name"]>,
) {
  return <Ionicons size={28} {...props} />;
}
