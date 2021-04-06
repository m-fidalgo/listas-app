import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";

export default function LoginView(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "266207997562-joire7rov36bo8apgrrehaucqhdoo9aj.apps.googleusercontent.com",
    });

    const onAuthStateUnsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          props.onLogin(user);
        }
      });

    return () => onAuthStateUnsubscribe();
  });

  async function login() {
    try {
      const resp = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (error) {
      setErrorMessage("Email e/ou Senha inválidos");
      setEmail("");
      setPassword("");
    }
  }

  async function signInEmail() {
    if (password.length >= 6) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage("Erro no cadastro");
        setEmail("");
        setPassword("");
      }
    } else {
      setErrorMessage("A senha deve ter no mínimo 6 caracteres");
      setEmail("");
      setPassword("");
    }
  }

  async function signInGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      signIn(credential);
    } catch (error) {
      console.log(error);
    }
  }

  async function signIn(credential) {
    return firebase.auth().signInWithCredential(credential);
  }

  function resetPassword() {
    if (email) {
      firebase.auth().sendPasswordResetEmail(email);
    } else {
      setErrorMessage("Digite seu email");
      setPassword("");
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Button
          title={isNewUser ? "Fazer login" : "Novo Cadastro"}
          onPress={() => setIsNewUser(!isNewUser)}
        />
      </View>
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
        {isNewUser ? (
          <Button title="Cadastrar" onPress={signInEmail} />
        ) : (
          <View>
            <Button title="Login" onPress={login} />
            <TouchableOpacity onPress={resetPassword}>
              <Text style={styles.loginMsg}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        )}
        <Text style={[styles.loginMsg, styles.loginError]}>{errorMessage}</Text>
      </View>
      <GoogleSigninButton
        style={styles.googleBtn}
        color={GoogleSigninButton.Color.Dark}
        size={GoogleSigninButton.Size.Wide}
        onPress={signInGoogle}
      />
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
    marginTop: 15,
  },
  loginInput: {
    fontSize: 18,
    margin: 5,
  },
  loginMsg: {
    marginTop: 15,
    alignSelf: "center",
  },
  loginError: {
    color: "red",
  },
  googleBtn: {
    width: 180,
    height: 50,
    marginTop: 15,
  },
});
