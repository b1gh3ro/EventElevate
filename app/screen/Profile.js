import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { signOut } from "firebase/auth";
// import { FirebaseAuth } from "../../firebaseConfig.js";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

import { FirebaseDB } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import QRCode from "react-native-qrcode-svg";

const FIREBASE_DB = FirebaseDB;

export default function Profile() {
  const [docSnapData, setdocSnapData] = useState({ PhoneNumber: "loading..." });
  let displayName = undefined;
  const auth = getAuth();
  let user = auth.currentUser;
  console.log(typeof user.displayName);
  const signoutFirebase = async () => {
    signOut(auth);
  };

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(FIREBASE_DB, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setdocSnapData(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>ME</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{docSnapData.Name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Phone Number:</Text>
          <Text style={styles.infoText}>{docSnapData.PhoneNumber}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoText}>{docSnapData.Email} </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text style={styles.infoText}>Online</Text>
        </View>
        <View style={styles.infoContainer}>
          <TouchableOpacity onPress={signoutFirebase}>
            <Text style={styles.infoLabel}>signout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
        <QRCode
          //QR code value
          value={user.uid ? user.uid : 'NA'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F3",
  },
  locationContainer: {
    flex: 1,
    marginBottom: 20,
  },

  map: {
    width: "100%",
    height: "100%",
  },
  body: {
    marginTop: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
  avatar: {
    fontSize: 72,
    fontWeight: "700",
  },
  nameContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666666",
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
  },
});
