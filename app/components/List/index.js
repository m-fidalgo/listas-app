import React, { useState, useEffect } from "react";
import ListItem from "../ListItem";
import Clipboard from "@react-native-community/clipboard";
import {
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableHighlight,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

export default function List(props) {
  const [list, setList] = useState({ body: { items: [] } });
  const [newItemDesc, setNewItemDesc] = useState("");

  const noImg =
    "data:image/png;base64,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";
  const img = list.body.picture || noImg;

  useEffect(() => {
    if (props.list) {
      let listProps = props.list;

      if (!listProps.body.items) {
        listProps.body.items = [];
      }

      setList(listProps);
    }
  }, []);

  async function pasteImg() {
    const imageUrl = await Clipboard.getString();
    const extensions = ["png", "jpg", "jpeg"];
    const isImage = extensions.some((extension) =>
      imageUrl.toLowerCase().includes(extension)
    );

    if (isImage) {
      updateList("picture", imageUrl);
    }
  }

  function updateList(field, value) {
    const newBody = Object.assign({}, { ...list.body }, { [field]: value });
    const newList = Object.assign({}, list, { body: newBody });
    setList(newList);
  }

  function createListItem() {
    if (newItemDesc) {
      const newItem = {
        id: Date.now().toString(),
        description: newItemDesc,
        done: false,
      };

      updateListItem(newItem);
      setNewItemDesc("");
    }
  }

  function updateListItem(item) {
    const itemIndex = list.body.items.findIndex(
      (listItem) => listItem.id == item.id
    );
    const newListItems = [...list.body.items];

    if (itemIndex >= 0) {
      newListItems[itemIndex] = item;
    } else {
      newListItems.push(item);
    }

    updateList("items", newListItems);
  }

  function removeListItem(item) {
    const itemIndex = list.body.items.findIndex(
      (listItem) => listItem.id == item.id
    );
    const newListItems = [...list.body.items];

    newListItems.splice(itemIndex, 1);
    updateList("items", newListItems);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button title="<- Voltar" onPress={props.onClose} />
      <View style={[styles.container, styles.containerInside]}>
        <TextInput
          style={[styles.txtInput, styles.txtInputTitle]}
          placeholder="Titulo"
          value={list.body.title}
          onChangeText={(text) => updateList("title", text)}
        />
        <View style={styles.containerRow}>
          <TouchableHighlight onPress={pasteImg}>
            <Image style={styles.img} source={{ uri: img }} />
          </TouchableHighlight>
          <TextInput
            style={[styles.txtInput, styles.txtInputFlex]}
            placeholder="Descricao"
            value={list.body.description}
            onChangeText={(text) => updateList("description", text)}
            numberOfLines={3}
            multiline={true}
          />
        </View>
        <View style={styles.containerRow}>
          <TextInput
            style={[styles.txtInput, styles.txtInputFlex]}
            placeholder="Novo Item"
            value={newItemDesc}
            onChangeText={(text) => setNewItemDesc(text)}
          />
          <Button title="+" onPress={createListItem} color="green" />
        </View>
        <FlatList
          style={styles.container}
          data={list.body.items}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onUpdate={updateListItem}
              onRemove={removeListItem}
            />
          )}
        />
      </View>
      <Button title="Salvar" onPress={() => props.onUpdate(list)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerRow: {
    flexDirection: "row",
  },
  containerInside: {
    padding: 5,
  },
  txtInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
  },
  txtInputTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  txtInputFlex: {
    flex: 1,
  },
  img: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
});
