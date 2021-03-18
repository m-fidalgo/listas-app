import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { ListsService } from "./app/services/ListsService";
import ListsView from "./app/views/ListsView";

export default function App() {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // [
  //   {
  //     title: "Mercado",
  //     description: "Comprar",
  //     picture:
  //       "http://jornalsomos.com.br/img/noticias/carrinho-mercado-inova-social.jpg",
  //     items: [
  //       { id: "0", description: "Farinha", done: false },
  //       { id: "1", description: "Leite", done: false },
  //     ],
  //     id: "8lAJLfVzk7UkFzyI",
  //   },
  // ]

  async function getLists() {
    setIsLoading(true);
    const items = await ListsService.list();
    setLists(items);
    setIsLoading(false);
  }

  useEffect(() => {
    getLists();
  }, []);

  return (
    <View style={styles.container}>
      <ListsView lists={lists} />
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
});
