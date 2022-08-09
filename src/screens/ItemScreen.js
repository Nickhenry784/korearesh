import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Text,
  FlatList} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataBg = [
  {id: 1, question: "Who always drives his customers away?", text: "A taxi-driver"},
  {id: 2, question: "What is the longest word in the English language?", text: "Smiles, because there is a mile between the beginning and the end of it."},
  {id: 3, question: "Why is the letter E so important?", text: "Because it is the beginning of everything"},
  {id: 4, question: "Where can you always find money?", text: "In the dictionary"},
  {id: 5, question: "What has ears but can not hear?", text: "Corn"},
  {id: 6, question: "What has arms but can not hug?", text: "Armchair"},
  {id: 7, question: "What month do soldiers hate?", text: "March"},
  {id: 8, question: "What clothing is always sad?", text: "Blue jeans"},
  {id: 9, question: "Why are dogs afraid to sunbathe?", text: "They don’t want to be hot-dogs"},
  {id: 10, question: "What makes opening piano so hard?", text: "All the keys are inside."},
]

const ItemScreen = ({navigation, route}) => {

  const [index, setIndex] = useState(randomIntFromInterval(0,dataBg.length - 1));
  const [text, onChangeText] = useState("");
  const [score, setScore] = useState(0);


  const onEndChangeText = () => {
    if(text.toLocaleLowerCase() === dataBg[index].text.toLocaleLowerCase()){
      setScore(score + 10);
      onChangeText("");
      setIndex(randomIntFromInterval(0,dataBg.length - 1));
      return () => {
        clearTimeout(timeOut);
      }
    }else{
      navigation.goBack();
    }
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.home} style={appStyle.btnBack} />
        </TouchableOpacity>
        <Text style={appStyle.scoreText}>{`Score: ${score}`}</Text>
      </View>
      <ImageBackground source={images.bang} style={appStyle.square2}>
        <Text style={appStyle.textLabel}>{dataBg[index].question}</Text>
      </ImageBackground>
      
      <View style={appStyle.bottomView}>
        <View style={appStyle.inputView}>
          <Text style={appStyle.textLabel}>Result: </Text>
          <TextInput
            style={appStyle.input}
            onChangeText={onChangeText}
            value={text}
            placeholder={"Text here"}
          />
        </View>
        <TouchableOpacity onPress={() => onEndChangeText()}>
          <Image source={images.check} style={appStyle.btn} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  textLabel: {
    fontSize: 30,
    fontFamily: 'Write Nice',
    color: 'black',
  },
  square2: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBar: {
    height: windowHeight * 0.1,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  squareImage: {
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    marginHorizontal: 10,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bangImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  btn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  scoreView: {
    position: 'absolute',
    top: '5%',
    right: '10%',
  },
  input: {
    height: 60,
    width: windowWidth * 0.6,
    backgroundColor: 'white',
    margin: 12,
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  boardImage: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '0%',
  },
  inputView: {
    width: windowWidth * 0.9,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  foodImage: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
  },
  backBtn: {
    position: 'absolute',
    top: '3%',
    left: '3%'
  },
  scoreText: {
    fontSize: 25,
    fontFamily: 'Write Nice',
    color: 'black',
  },
  btnBack: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
});

export default ItemScreen;