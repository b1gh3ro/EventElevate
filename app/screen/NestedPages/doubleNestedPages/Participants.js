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
import { FirebaseDB } from "../../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseAuth } from "../../../../firebaseConfig";
import { getAuth } from "firebase/auth";

export default function Participants({ navigation, route }) {
  let displayName = undefined;
  const auth = getAuth();
  let user = auth.currentUser;
  const [searchText, setSearchText] = useState();
  const [docSnapData, setdocSnapData] = useState(null);
  const [optionList, setOptionList] = useState([]);
  const [optionListpa, setOptionListpa] = useState([]);
  // const handleSearch = (text) => {
  //   setSearchText(text);
  // };
  // const filteredData = optionList.filter((item) => {
  //   return item.name.toLowerCase().includes(searchText.toLowerCase());
  // });
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(FirebaseDB, "Events", route.params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data User:", docSnap.data());
        setdocSnapData(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    fetchData();
  }, [navigation]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const docRef = doc(FirebaseDB, "users", user.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log("Document data User:", docSnap.data());
  //       setdocSnapData(docSnap.data());
  //     } else {
  //       // docSnap.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   }

  //   fetchData();
  // }, []);
  useEffect(() => {
    async function fetchEventsData() {
      // const querySnapshot = await getDocs(collection(FirebaseDB, "Events"));
      const tempList = [];
      const tempList2 = [];
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      //   tempList.push(doc.data());
      // });
      // console.log(tempList);
      console.log("going inside loop");
      for (let i = 0; i < docSnapData.participants.length; i++) {
        console.log("inside the loop");
        console.log(docSnapData.participants[i].trim());
        const docRef = doc(
          FirebaseDB,
          "users",
          docSnapData.participants[i].trim()
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data Event:", docSnap.data());
          const dict = docSnap.data();
          dict["id"] = docSnapData.participants[i].trim();
          tempList.push(dict);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }
      setOptionList(tempList);

      for (let i = 0; i < docSnapData.verifiedParticipants.length; i++) {
        console.log("inside the loop");
        console.log(docSnapData.verifiedParticipants[i].trim());
        const docRef = doc(
          FirebaseDB,
          "users",
          docSnapData.verifiedParticipants[i].trim()
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data Event:", docSnap.data());
          const dict = docSnap.data();
          dict["id"] = docSnapData.verifiedParticipants[i].trim();
          tempList2.push(dict);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }
      setOptionListpa(tempList2);
    }
    fetchEventsData();
  }, docSnapData);

  const searchFilteredData = searchText
    ? optionList.filter((x) =>
        x.Name.toLowerCase().includes(searchText.toLowerCase())
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
      {searchFilteredData == [] ? (
        <></>
      ) : (
        <FlatList
          data={searchFilteredData}
          keyExtractor={(item) => {
            return item.Title;
          }}
          renderItem={({ item }) => {
            return (
              <Card key={item.id}>
                {/* <CardImage  source={{ uri: item.Name }} title={item.Email} /> */}
                <CardTitle
                  style={{ backgroundColor: "lightgrey" }}
                  subtitle={item.Name}
                />
                <CardTitle subtitle={item.Email} />
                <CardTitle subtitle={item.PhoneNumber} />
              </Card>

              // <View key={item.id} style={{ flexDirection: "row" }}>
              //   <Text>Name: {item.Name} </Text>
              //   <Text>Email: {item.Email} </Text>
              //   <Text>Phone Number: {item.PhoneNumber} </Text>
              // </View>
            );
          }}
        />
      )}
      {optionListpa == [] ? (
        <></>
      ) : (
        <FlatList
          data={optionListpa}
          keyExtractor={(item) => {
            return item.Title;
          }}
          renderItem={({ item }) => {
            return (
              <Card key={item.id}>
                {/* <CardImage  source={{ uri: item.Name }} title={item.Email} /> */}
                <CardTitle
                  style={{ backgroundColor: "green" }}
                  subtitle={item.Name}
                />
                <CardTitle subtitle={item.Email} />
                <CardTitle subtitle={item.PhoneNumber} />
              </Card>

              // <View key={item.id} style={{ flexDirection: "row" }}>
              //   <Text>Name: {item.Name} </Text>
              //   <Text>Email: {item.Email} </Text>
              //   <Text>Phone Number: {item.PhoneNumber} </Text>
              // </View>
            );
          }}
        />
      )}
      <TouchableOpacity
        style={{ flex: 0, alignSelf: "flex-start", margin: 20 }}
        onPress={() => {
          navigation.navigate("qrcode", {
            Event: route.params,
            participants: optionList,
          });
        }}
      >
        {/* button kek also why comments being weird here */}
        <View
          style={{ padding: 10, backgroundColor: "blue", borderRadius: 10 }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            scan qr code
          </Text>
        </View>
      </TouchableOpacity>
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
