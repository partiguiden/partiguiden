import React, { useCallback } from "react";
import type { ListRenderItem } from "react-native";
import { FlatList, Text, View } from "react-native";

const mockData = [
  {
    id: 1,
    title: "Bostad",
  },
  {
    id: 2,
    title: "Ekonomi och Skatter",
  },
  {
    id: 3,
    title: "Försvar och Säkerhet",
  },
  {
    id: 4,
    title: "Klimat och Miljö",
  },
  {
    id: 5,
    title: "Kultur och Idrott",
  },
  {
    id: 6,
    title: "Näringsliv och Jobb",
  },
  {
    id: 7,
    title: "Socialt",
  },
  {
    id: 8,
    title: "Transport och Infrastruktur",
  },
];

export default function StandpointsScreen() {
  const renderItem: ListRenderItem<(typeof mockData)[number]> = useCallback(
    ({ item }) => {
      return (
        <View>
          <Text className="text-lg">{item.title}</Text>
        </View>
      );
    },
    [],
  );

  return <FlatList data={mockData} renderItem={renderItem} />;
}
