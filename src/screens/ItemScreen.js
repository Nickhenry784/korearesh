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
  {id: 1, bg: images.bangtong, text: "PangTong"},
  {id: 2, bg: images.GuanYu, text: "GuanYu"},
  {id: 3, bg: images.LiuBei, text: "LiuBei"},
  {id: 4, bg: images.machao, text: "MaChao"},
  {id: 5, bg: images.ZhangFei, text: "ZhangFei"},
  {id: 6, bg: images.ZhugeLiang, text: "ZhugeLiang"},
  {id: 7, bg: images.shaoyun, text: "ZhaoYun"},
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
 useEffect(() => {
  console.log(makeid());
 }, [])

 const makeid = ()  => {
  var text = "";
  var possible = dataBg[index].text;

  for (var i = 0; i < dataBg[index].text.length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.backBtn}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.home} style={appStyle.btnBack} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.scoreView}>
        <Text style={appStyle.scoreText}>{`Score: ${score}`}</Text>
      </View>
      <View style={appStyle.bangImage}>
        <Image source={dataBg[index].bg} style={appStyle.foodImage} />
      </View>
      
      <View style={appStyle.bottomView}>
        <TextInput
          style={appStyle.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={"Text here"}
          onEndEditing={() => onEndChangeText()}
        />
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
    justifyContent: 'center',
    resizeMode: 'cover',
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
    width: windowWidth * 0.7,
    backgroundColor: 'white',
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
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
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