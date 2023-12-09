import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Touchable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getAuth } from "firebase/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { FirebaseDB } from "../../../firebaseConfig";

function EventDetails({ Navigation, route }) {
  let displayName = undefined;
  const auth = getAuth();
  let user = auth.currentUser;

  const register = async (id) => {
    const userRef = doc(FirebaseDB, "Events", id);

    await updateDoc(userRef, {
      participants: arrayUnion(user.uid),
    });
    const useraRef = doc(FirebaseDB, "users", user.uid);

    await updateDoc(useraRef, {
      EventsEnrolled: arrayUnion(id),
    });

    Alert.alert("registered!");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: "white" }}>
          <Image
            resizeMode="contain"
            style={styles.eventLogo}
            source={{ uri: route.params.Image }}
          />
          <TouchableOpacity
            onPress={() => {
              register(route.params.id);
            }}
            style={{ alignItems: "flex-end", padding: 25 }}
          >
            <Text style={{ fontSize: 20, color: "red" }}>Register </Text>
          </TouchableOpacity>
          <View style={styles.baseText}>
            <Text style={styles.eventHeading}>{route.params.Title}</Text>
            <Text style={styles.eventGenre}>{route.params.Location}</Text>
            <Text>
              Hack Your Path 5.0 Hack your path is an annual hackathon event
              which takes place in Hyderabad Institute of Technology And
              Management. THEMES: Industry 4.0 and Smart Manufacturing:
              Automated Quality Control System : Construct an elaborate system
              that maximizes predictive maintenance in an intelligent
              manufacturing setting. Utilize innovative techniques to anticipate
              probable equipment malfunctions, optimizing operational
              effectiveness through well-planned maintenance schedules,
              decreased downtime, and increased output. Optimizing Predictive
              Maintenance : Design a software system utilizing machine learning
              algorithms to predict equipment failures in a smart manufacturing
              environment. The goal is to optimize maintenance schedules, reduce
              downtime, and improve overall efficiency. Supply Chain
              Transparency and Traceability : Develop an system to enhance
              traceability and transparency in the industrial supply chain.
              Utilize technologies like blockchain to ensure the authenticity of
              components and raw materials, thereby improving overall supply
              chain integrity. HealthTech Revolution: Platform for Remote
              Patient Monitoring : Develop an extensive system for health
              technologies that allows for remote patient monitoring. Enable
              remote monitoring of vital signs and health data to improve
              patient outcomes and enable proactive healthcare actions.
              AI-Powered Medical Advisor : Create system that uses artificial
              intelligence to evaluate medical photos, test results, and patient
              histories. The purpose of this technique is to help physicians
              diagnose illnesses more quickly. Customized App for Health and
              Wellbeing (Software): Create a program that uses a user's
              lifestyle, interests, and health information to give them with
              tailored health and wellness recommendations. Use machine learning
              to improve personalization.{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  baseText: {
    // fontFamily:'Cochin'
    width: "96%",
    left: 10,
    bottom: -30,
  },
  eventHeading: {
    fontSize: 20,
    fontWeight: "bold",
    bottom: 20,
  },
  eventGenre: {
    fontSize: 12,
    color: "darkgrey",
  },
  eventLogo: {
    alignSelf: "center",
    width: 300,
    height: 300,
  },
});

export default EventDetails;
