import React, { useMemo } from "react";
import type { StyleProp, TextStyle } from "react-native";
import { Text } from "react-native";

import { colors } from "@lib/colors";

interface TypographyOptions {
  variant: Variant;
  color?: keyof typeof colors;
}

type TypographyProps = React.PropsWithChildren<TypographyOptions>;

export function Typography({ children, ...styleProps }: TypographyProps) {
  const style = useMemo(() => getStyle(styleProps), [styleProps]);

  return <Text style={style}>{children}</Text>;
}

type Variant = "title" | "subtitle" | "body" | "caption" | "button";

function getStyle({
  variant,
  color = "black",
}: TypographyProps): StyleProp<TextStyle> {
  return {
    fontSize: fontSizes[variant],
    color: colors[color],
  };
}

const fontSizes: Record<Variant, number> = {
  title: 24,
  subtitle: 20,
  body: 16,
  caption: 14,
  button: 16,
};
