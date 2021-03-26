import React, { useState, useEffect } from "react";
import { View, Modal, Button, StyleSheet } from "react-native";
import { ListsService } from "./app/services/ListsService";
import ListsView from "./app/views/ListsView";
import List from "./app/components/List";

export default function App() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  async function getLists() {
    setIsLoading(true);
    const items = await ListsService.list();
    setLists(items);
    setIsLoading(false);
  }

  useEffect(() => {
    getLists();
  }, []);

  async function createList() {
    const newList = await ListsService.create({
      title: "Nova Lista",
      description: "",
      picture: "",
      items: [],
    });
    setLists([...lists, newList]);
    selectList(newList);
  }

  function removeList(listToRemove) {
    setLists(lists.filter((list) => list.id != listToRemove.id));

    ListsService.remove(listToRemove.id);
  }

  function selectList(list) {
    setSelectedList(list);
    setIsModalVisible(true);
  }

  function updateList(newList) {
    const listIndex = lists.findIndex((list) => list.id === newList.id);
    let newLists = lists;
    newLists[listIndex] = newList;
    setLists(newLists);
    clear();
    ListsService.update(newLists[listIndex]);
  }

  function clear() {
    setSelectedList({});
    setIsModalVisible(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="+ Nova Lista"
        onPress={() => createList()}
        style={styles.btn}
        color="green"
      />
      <View style={styles.container}>
        <ListsView
          lists={lists}
          onRemove={removeList}
          onSelect={selectList}
          isLoading={isLoading}
          getLists={getLists}
        />
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={false}>
        <List list={selectedList} onUpdate={updateList} onClose={clear} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  btn: {
    flex: 1,
  },
});
