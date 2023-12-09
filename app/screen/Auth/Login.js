import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { FirebaseAuth } from "../../../firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";

// import { SQLite } from "react-native-sqlite-storage"

// const users = {"john doe": "john@doe"}

// const db = SQLite.openDatabase(
//     {
//         name: 'MainDB',
//         location: 'default'
//     },
//     ()=>{},
//     (error) =>{console.log(error)}
// )

function Login({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const auth = FirebaseAuth;

  const signIn = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      if (error.code == "auth/invalid-login-credentials") {
        alert("Incorrect Login Credentials");
      } else if (error.code == "auth/invalid-email") {
        alert("Invalid Email");
      } else {
        console.log(error);
        alert("Please Contact Admins");
      }
    }
  };

  //     signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     alert("signed in!")
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     alert(errorMessage)
  //   });

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Login Screen</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#000000"
          onChangeText={(text) => {
            setemail(text);
          }}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#000000"
          onChangeText={(text) => {
            setpassword(text);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          signIn(email, password);
        }}
        style={styles.loginBtn}
      >
        <Text>LOGIN </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F3",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#101010",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: { height: 50, color: "black" },
  forgotAndSignUpText: { color: "black", fontSize: 11 },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});

export default Login;
