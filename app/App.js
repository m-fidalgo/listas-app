import React, { useState, useEffect } from "react";
import { View, Modal, Button, StyleSheet } from "react-native";
import { ListsService } from "./services/ListsService";
import ListsView from "./views/ListsView";
import List from "./components/List";

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
    ListsService.watch((data) => {
      setLists(data);
    });
  }, []);

  async function createList() {
    const newList = await ListsService.create({
      title: "",
      description: "",
      picture: "",
      items: [],
    });

    const listsDb = await ListsService.list();
    setLists(listsDb);
    selectList(newList);
  }

  async function updateList(newList) {
    await ListsService.update(newList);
    const listsDb = await ListsService.list();
    setLists(listsDb);
    clear();
  }

  async function removeList(listToRemove) {
    await ListsService.remove(listToRemove.id);
    const listsDb = await ListsService.list();
    setLists(listsDb);
  }

  function selectList(list) {
    setSelectedList(list);
    setIsModalVisible(true);
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
