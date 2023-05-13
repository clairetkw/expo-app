import { StyleSheet, Text, Image, TextInput, ScrollView , View, TouchableOpacity, Modal, Pressable } from "react-native";
import spitzPng from "./assets/spitz.png";
import React, { useState } from "react";

const RadioButton = ({ onPress, selected, children }) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {

  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);

  const [isLiked, setIsLiked] = useState([
    { id: 1, value: true, name: "Yes", selected: false },
    { id: 2, value: false, name: "No", selected: false }
  ]);

  const onRadioBtnClick = (item) => {
    let updatedState = isLiked.map((isLikedItem) => 
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    setIsLiked(updatedState);
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView>
      <Text>Your Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      ></TextInput>
      <Text>Your Age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
      ></TextInput>
      <Text style={styles.text}>Do you like coffee?</Text>
      {isLiked.map((item) => (
        <RadioButton
          onPress={() => onRadioBtnClick(item)}
          selected={item.selected}
          key={item.id}
        >
          {item.name}
        </RadioButton>
      ))}
      <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>My name is {name}. I am {age} years old. I {isLiked.name === Yes ? "like" : "dislike"} coffee.</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Submit</Text>
      </Pressable>
    </View>
      <Text>Here is a dog for your troubles:</Text>
      <Image 
        style={styles.image}
        source={spitzPng}
      ></Image>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 400,
    width: 400,
  },
  input: {
    height: 30,
    margin: 20,
    borderWidth: 1,
    padding: 10,
  },

  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 45
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "#98CFB6"
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
