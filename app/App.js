import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import MainView from "./views/MainView";
import LoginView from "./views/LoginView";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  function onLogin(user) {
    setUser(user);
    setIsLogged(true);
  }

  async function onLogout() {
    setIsLogged(false);
    setUser(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLogged ? (
        <MainView user={user} onLogout={onLogout} />
      ) : (
        <LoginView onLogin={onLogin} />
      )}
    </SafeAreaView>
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
