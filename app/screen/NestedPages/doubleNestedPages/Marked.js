import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { signOut } from "firebase/auth";
// import { FirebaseAuth } from "../../firebaseConfig.js";

export default function Marked({ navigator, route }) {
  return (
    <View>
      <Text>{route.params.text}</Text>
    </View>
  );
}
