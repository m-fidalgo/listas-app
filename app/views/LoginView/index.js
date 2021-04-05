import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";

export default function LoginView(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = firebase.auth();

  useEffect(() => {
    const onAuthStateUnsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        props.onLogin(user);
      }
    });

    return onAuthStateUnsubscribe();
  }, []);

  async function login() {
    try {
      const resp = await auth.signInWithEmailAndPassword(email, password);
      props.onLogin(resp.user);
    } catch (error) {
      setErrorMessage("Email e/ou Senha inválidos");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.loginInput}
          placeholder="Email"
          keyboardType={"email-address"}
          autoCapitalize={"none"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.loginInput}
          placeholder="Senha"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Login" onPress={login} />
        <Text style={styles.loginError}>{errorMessage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    width: "90%",
    borderWidth: 2,
    padding: 15,
  },
  loginInput: {
    fontSize: 18,
    margin: 5,
  },
  loginError: {
    color: "red",
    marginTop: 15,
    alignSelf: "center",
  },
});
