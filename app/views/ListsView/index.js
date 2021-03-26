import React from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import SimpleList from "../../components/SimpleList";

export default function ListsView(props) {
  return (
    <View style={styles.containerFL}>
      <FlatList
        data={props.lists}
        renderItem={({ item }) => (
          <SimpleList
            list={item}
            onRemove={props.onRemove}
            onSelect={() => props.onSelect(item)}
          />
        )}
        keyExtractor={(item) => {
          return item.id;
        }}
        numColumns={3}
        refreshControl={
          <RefreshControl
            refreshing={props.isLoading}
            onRefresh={props.getLists}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
