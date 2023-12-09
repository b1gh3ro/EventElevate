import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { FirebaseDB } from "../../../../firebaseConfig";

export default function Qrcode({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    const fetchData = async () => {
      const userRef = doc(FirebaseDB, "Events", route.params.Event.id);
      await updateDoc(userRef, {
        participants: arrayRemove(data),
        verifiedParticipants: arrayUnion(data),
      });
    };
    for (let i = 0; i < route.params.participants.length; i++) {
      if (data == route.params.participants[i].id) {
        fetchData();
        setScanned(true);
        navigation.navigate("Marked", {
          text: "success! the user has been verified.",
        });
      } else {
        setScanned(true);

        navigation.navigate("Marked", {
          text: "User couldnt be verified please try again later.",
        });
      }
    }
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Scan QRcode to verify!</Text>
      <Text style={styles.paragraph}>Scan a barcode to start your job.</Text>
      {renderCamera()}
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => setScanned(false)}
        disabled={scanned}
      >
        <Text style={styles.buttonText}>Scan QR to Start your job</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: "80%",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
