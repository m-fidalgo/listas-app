import React from "react";
import { View, Switch, TextInput, Button, StyleSheet } from "react-native";

export default function ListItem(props) {
  function updateItem(field, value) {
    const newItem = Object.assign({}, props.item, { [field]: value });
    props.onUpdate(newItem);
  }

  return (
    <View>
      <Switch
        value={props.item.done}
        onValueChange={(done) => updateItem("done", done)}
      />
      <TextInput
        style={styles.txtInput}
        placeholder="Descrição"
        value={props.item.description}
        onChangeText={(text) => updateItem("description", text)}
        editable={!props.item.done}
      />
      <Button
        title="X"
        onPress={() => props.onRemove(props.item)}
        color="red"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  txtInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
});
