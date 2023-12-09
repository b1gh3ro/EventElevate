import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { onAuthStateChanged, User } from "firebase/auth";

import WelcomeScreen from "./app/screen/Auth/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screen/Auth/Login";
import { useState, useEffect } from "react";
import { FirebaseAuth } from "./firebaseConfig";
import HomePage from "./app/screen/HomePage";
import Signup from "./app/screen/Auth/Signup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerItems from "./Constants/constants";
import Profile from "./app/screen/Profile";
import CreateEvents from "./app/screen/CreateEvents";
import EventDetails from "./app/screen/NestedPages/EventDetails";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import { LogBox } from "react-native";
import EventForm from "./app/screen/NestedPages/EventForm";
import EventDetailsOrg from "./app/screen/NestedPages/EventDetailsOrg";
import Participants from "./app/screen/NestedPages/doubleNestedPages/Participants";
import Qrcode from "./app/screen/NestedPages/doubleNestedPages/Qrcode";
import Marked from "./app/screen/NestedPages/doubleNestedPages/Marked";
import EnrolledEvents from "./app/screen/EnrolledEvents";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const MainScreen = () => {
  return (
    <Drawer.Navigator
      drawerType="front"
      initialRouteName="Login Screen"
      screenOptions={{
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 10 },
      }}
    >
      {DrawerItems.map((drawer) => (
        <Drawer.Screen
          key={drawer.name}
          name={drawer.name}
          options={{
            headerRight: () => (
              <AntDesign
                name="bells"
                size={24}
                color="black"
                style={{ paddingRight: 20 }}
                onPress={() => {
                  console.log("bell pressed");
                }}
              />
            ),
            drawerIcon: ({ focused }) =>
              drawer.iconType === "Material" ? (
                <MaterialCommunityIcons
                  name={drawer.iconName}
                  size={24}
                  color={focused ? "#e91e63" : "black"}
                />
              ) : drawer.iconType === "Feather" ? (
                <Feather
                  name={drawer.iconName}
                  size={24}
                  color={focused ? "#e91e63" : "black"}
                />
              ) : (
                <></>
              ),
          }}
          component={
            //drawer.name==='LoginScreen' ? LoginScreen
            drawer.name === "HomePage"
              ? HomePage
              : drawer.name == "Profile"
              ? Profile
              : drawer.name == "Enrolled Events"
              ? EnrolledEvents
              : CreateEvents
          }
        />
      ))}
    </Drawer.Navigator>
  );
};

export default function App() {
  const auth = FirebaseAuth;
  const [user, setuser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setuser(user);
      console.log("user:", user);
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user == null ? (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="EventElevate"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="EventDetails" component={EventDetails} />
            <Stack.Screen name="EventForm" component={EventForm} />
            <Stack.Screen name="EventDetailsOrg" component={EventDetailsOrg} />
            <Stack.Screen name="Participants" component={Participants} />
            <Stack.Screen name="qrcode" component={Qrcode} />
            <Stack.Screen name="Marked" component={Marked} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
