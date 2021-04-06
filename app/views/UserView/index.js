import React from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";

const noImg = "http://cdn.onlinewebfonts.com/svg/img_127897.png";

export default function UserView(props) {
  async function logout() {
    const auth = firebase.auth();
    await auth.signOut();
    props.onLogout();
  }

  async function linkGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      linkWithCredential(credential);
    } catch (error) {
      console.log(error);
    }
  }

  async function linkWithCredential(credential) {
    await firebase.auth().currentUser.linkWithCredential(credential);
    props.onUpdateUser();
  }

  async function unlinkCredential(providerId) {
    await firebase.auth().currentUser.unlink(providerId);
    props.onUpdateUser();
  }

  function btnGoogle() {
    if (
      props.user.providerData.some(
        ({ providerId }) => providerId === "google.com"
      )
    ) {
      if (props.user.providerData.length > 1) {
        return (
          <Button
            title="Desconectar do Google"
            onPress={() => unlinkCredential("google.com")}
          />
        );
      }
      return null;
    } else {
      return <Button title="Conectar ao Google" onPress={linkGoogle} />;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="X" color="red" onPress={props.onClose} />
      </View>
      <ScrollView style={styles.userContainer}>
        <View style={styles.userProfile}>
          <Image
            style={styles.userImg}
            source={{ uri: props.user.photoURL || noImg }}
          />
          <Text style={styles.userName}>
            {props.user.displayName || props.user.email}
          </Text>
        </View>
        <View>{btnGoogle()}</View>
        <Button title="Logout" onPress={logout} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  header: {},
  userContainer: {},
  userProfile: {
    backgroundColor: "#4785ee",
    margin: 5,
    padding: 5,
    alignItems: "center",
  },
  userImg: {
    width: 120,
    height: 110,
    margin: 10,
  },
  userName: {
    color: "#fff",
    fontSize: 20,
  },
});
