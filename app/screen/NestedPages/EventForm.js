import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";
import { collection, addDoc, Firestore, arrayUnion } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { FirebaseDB } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";

const EventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  let displayName = undefined;
  const auth = getAuth();
  let user = auth.currentUser;
  console.log(typeof user.displayName);

  const handleAddEvent = async () => {
    // TODO: Implement logic to add the event using the form data
    // For now, you can log the form data
    console.log({ title, description, genre, location, image });
    const docRef = await addDoc(collection(FirebaseDB, "Events"), {
      Title: title,
      Desc: description,
      Genre: genre,
      Location: location,
      Image: image,
      participants: [],
      verifiedParticipants: [],
    });

    const userRef = doc(FirebaseDB, "users", user.uid);
    await updateDoc(userRef, {
      EventsOrganised: arrayUnion(docRef.id),
    });
  };

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <Text>Description</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        numberOfLines={100} // Adjust as needed
      />
      <Text>Genre</Text>
      <TextInput
        style={styles.input}
        value={genre}
        onChangeText={(text) => setGenre(text)}
      />

      <Text>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      <Text>Image URL</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={(text) => setImage(text)}
      />

      <Button title="Add Event" onPress={handleAddEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default EventForm;
