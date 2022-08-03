import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Text} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataBg = [
  {id: 1, bg: images.chimcanhcut, text: "penguin"},
  {id: 2, bg: images.dadieu, text: "Ostrich"},
  {id: 3, bg: images.gautruc, text: "Panda"},
  {id: 4, bg: images.hama, text: "hippo"},
  {id: 5, bg: images.ho, text: "Tiger"},
  {id: 6, bg: images.huucaoco, text: "giraffe"},
  {id: 7, bg: images.khi, text: "monkey"},
  {id: 8, bg: images.ngua, text: "horse"},
  {id: 9, bg: images.rua, text: "turtle"},
  {id: 10, bg: images.sutu, text: "lion"},
  {id: 10, bg: images.voi, text: "elephants"},
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
      <View style={appStyle.backBtn}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.home} style={appStyle.btnBack} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.scoreView}>
        <Text style={appStyle.scoreText}>{`Score: ${score}`}</Text>
      </View>
      <Image source={dataBg[index].bg} style={appStyle.foodImage} />
      <View style={appStyle.bottomView}>
        <TextInput
          style={appStyle.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={"Text here"}
          onEndEditing={() => onEndChangeText()}
        />
        <TouchableOpacity onPress={() => onEndChangeText()}>
          <Image source={images.Check} style={appStyle.btn} />
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
    justifyContent: 'center',
    resizeMode: 'cover',
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
    width: windowWidth * 0.7,
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 12,
    fontSize: 20,
    padding: 10,
  },
  boardImage: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
  },
  boardView: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.3,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: '30%',
    left: '10%',
    transform: [{
      rotate: '-20deg',
    }]
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '0%',
  },
  foodImage: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.5,
    resizeMode: 'contain',
  },
  backBtn: {
    position: 'absolute',
    top: '3%',
    left: '3%'
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnBack: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
});

export default ItemScreen;