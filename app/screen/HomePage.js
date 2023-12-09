// import React from "react";
// import {
//   ImageBackground,
//   StyleSheet,
//   Alert,
//   Button,
//   TouchableHighlight,
//   Image,
//   View,
// } from "react-native";
// import { signOut } from "firebase/auth";
// import { FirebaseAuth } from "../../firebaseConfig.js";

// function HomePage({ navigation }) {
//   return (
//     <ImageBackground
//       style={styles.background}
//       source={require("../assets/WPImage.jpg")}
//     >
//       <View style={{ alignItems: "center", height: "100%", width: "100%" }}>
//         <Image
//           resizeMode="contain"
//           style={styles.logo}
//           source={require("../assets/Logo.png")}
//         />
//       </View>
//       <TouchableHighlight>
//         <Button
//           color="#fc5c65"
//           title="Signout"
//           style={styles.loginButton}
//           onPress={() => signOut(FirebaseAuth)}
//         />
//       </TouchableHighlight>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   loginButton: {
//     width: "100%",
//     height: 70,
//     // color:"#fc5c65",
//     alignItems: "flex-end",
//   },
//   registerButton: {
//     width: "100%",
//     height: 70,
//     // color:"#4ecdc4",
//   },
//   logo: {
//     width: "100%",
//     position: "absolute",
//     top: 50,
//   },
// });

// export default HomePage;

import * as React from "react";
import { Component, useState, useEffect } from "react";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-cards";
import { collection, getDocs } from "firebase/firestore";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  FlatList,
} from "react-native";
import { FirebaseDB } from "../../firebaseConfig";

export default function HomePage({ navigation }) {
  const [searchText, setSearchText] = useState();

  const [optionList, setOptionList] = useState([
    { Genre: "...", Image: "...", Location: "...", Title: "..." },
  ]);
  // const handleSearch = (text) => {
  //   setSearchText(text);
  // };
  // const filteredData = optionList.filter((item) => {
  //   return item.name.toLowerCase().includes(searchText.toLowerCase());
  // });

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(FirebaseDB, "Events"));
      const tempList = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        const dict = doc.data();
        dict["id"] = doc.id;
        tempList.push(dict);
      });
      console.log(tempList);
      setOptionList(tempList);
    }
    fetchData();
  }, []);

  //filtering
  const searchFilteredData = searchText
    ? optionList.filter((x) =>
        x.Location.toLowerCase().includes(searchText.toLowerCase())
      )
    : optionList;

  return (
    <ScrollView>
      <View style={styles.formContent}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Search for an event..."
            underlineColorAndroid="transparent"
            onChangeText={(text) => {
              setSearchText(text);
            }}
            value={searchText}
          />
        </View>
      </View>

      <FlatList
        data={searchFilteredData}
        keyExtractor={(item) => {
          return item.Title;
        }}
        renderItem={({ item }) => {
          return (
            <Card key={item.id}>
              <CardImage source={{ uri: item.Image }} title={item.Title} />
              <CardTitle subtitle={item.Genre} />
              <CardContent text={item.Location} />
              <CardAction separator={true} inColumn={false}>
                <CardButton onPress={() => {}} title="Share" color="#FEB557" />
                <CardButton
                  onPress={() => {
                    navigation.navigate("EventDetails", item);
                  }}
                  title="Details"
                  color="#FEB557"
                />
              </CardAction>
            </Card>
          );
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  formContent: {
    flexDirection: "row",
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  card: {
    height: null,
    paddingTop: 3,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    borderTopWidth: 40,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: "column",
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    alignSelf: "auto",
  },
  occ: {
    fontSize: 16,
    marginLeft: 10,
    alignSelf: "auto",
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: "#eee",
    marginTop: 5,
  },
});
