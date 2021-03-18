import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import SimpleList from "../../components/SimpleList";

export default function ListsView(props) {
  return (
    <View style={styles.containerFL}>
      <FlatList
        data={props.lists}
        renderItem={({ item }) => <SimpleList list={item} />}
        keyExtractor={(item) => {
          return item.id;
        }}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
