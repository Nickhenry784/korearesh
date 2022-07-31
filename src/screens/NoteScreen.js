import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions, 
  ImageBackground, 
  Image,
  FlatList, 
  Alert,  
  TextInput} from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";
import { addNote, deleteNote, editNote } from "../redux/noteSlice";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


const NoteScreen = ({navigation, route}) => {

  const dispatch = useDispatch();

  const {note} = route.params;

  const [titleText, onChangeTitle] = useState(note === null ? "" : note.title);

  const [text, onChangeText] = useState(note === null ? "" : note.noteText);

  const onClickBackButton = () => {
   navigation.goBack();
  }

  const onClickSaveButton = () => {
    if(titleText === null || text === null){
      Alert.alert("Please input your text!");
      return false;
    }
    const note = {
      title: titleText,
      noteText: text,
    };
    if(note === null){
      dispatch(addNote(note));
    }else{
      dispatch(editNote(note));
    }
    Alert.alert("Save successfully!");
  }

  const onClickDeleteBtn = () => {
    if(note !== null){
      dispatch(deleteNote(note));
      Alert.alert("Delete successfully!");
      navigation.goBack();
    }
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg12}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickBackButton}>
          <Image source={images.button_back} style={appStyle.scoreStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickDeleteBtn}>
          <Image source={images.deleteicon} style={appStyle.bullImage} />
        </TouchableOpacity>
      </View>
      <Text style={appStyle.labelText1}>Add Note:</Text>
      <Text style={appStyle.labelText}>Title:</Text>
      <TextInput
        style={appStyle.input}
        placeholder={"Title Note"}
        onChangeText={onChangeTitle}
        value={titleText}
      />
      <Text style={appStyle.labelText}>Note:</Text>
      <TextInput
        style={appStyle.input1}
        onChangeText={onChangeText}
        placeholder={"Note"}
        multiline={true}
        numberOfLines={10}
        value={text}
      />
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickSaveButton()}>
          <Image source={images.save_icon} style={appStyle.bullImage} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  input: {
    height: 40,
    margin: 12,
    width: windowWidth * 0.9,
    padding: 10,
    borderBottomWidth: 1,
  },
  input1: {
    height: 200,
    margin: 12,
    width: windowWidth * 0.9,
    padding: 10,
    borderBottomWidth: 1,
    textAlignVertical: 'top',
  },
  closeView: {
    position: 'absolute',
    top: '3%',
    right: '5%',
  },
  appBar: {
    height: windowHeight * 0.1,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  popupImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  popupView: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 1, 1, 0.7)',
    position: 'absolute',
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  okBtn: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  bottomView: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: windowWidth * 0.07,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerView: {
    flex: 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  turnView: {
    width: windowWidth * 0.15,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bullImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  startBtn: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    resizeMode: 'contain',
    margin: 10,
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  turnText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 20,
    paddingLeft: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  labelText1: {
    fontSize: 30,
    paddingLeft: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default NoteScreen;