import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";
var converter = require('number-to-words');

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


const ItemScreen = ({navigation, route}) => {

  const [text, setText] = useState([randomIntFromInterval(0,1000),randomIntFromInterval(0,1000),randomIntFromInterval(0,1000),randomIntFromInterval(0,1000)]);
  const [index, setIndex] = useState(randomIntFromInterval(0,3));
  const [score, setScore] = useState(0);

  const handleClickCheckBtn = (val) => {
    if(val === converter.toWords(text[index])){
      setScore(score + 10);
      setText([randomIntFromInterval(0,1000),randomIntFromInterval(0,1000),randomIntFromInterval(0,1000),randomIntFromInterval(0,1000)]);
      setIndex(randomIntFromInterval(0,3))
    }else{
      navigation.goBack();
    }
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.closeView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.btnback} style={appStyle.btnClose} />
        </TouchableOpacity>
        <Text style={appStyle.scoreText}>{`Score: ${score}`}</Text>
      </View>
      <View style={appStyle.centerView}>
        <Text style={appStyle.labelText}>{text[index]}</Text>
      </View>
      <Text style={appStyle.label}>Your answer</Text>
      <View style={appStyle.bottomView}>
        <FlatList 
          data={text}
          scrollEnabled
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleClickCheckBtn(converter.toWords(item))}>
              <ImageBackground source={images.answerbox1} style={appStyle.btn}>
                <Text style={appStyle.labelAnswer}>{converter.toWords(item)}</Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
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
  input: {
    height: 60,
    backgroundColor: 'white',
    width: windowWidth * 0.7,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 30,
    fontFamily: 'MontserratAlternates-Black',
    color: 'black',
  },
  closeView: {
    width: windowWidth,
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  centerView: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
  },
  labelText: {
    fontSize: 120,
    fontFamily: 'MontserratAlternates-Black',
    color: 'black',
  },
  label: {
    fontSize: 30,
    fontFamily: 'MontserratAlternates-Black',
    color: 'black',
    marginVertical: 20,
  },
  scoreText: {
    fontSize: 30,
    fontFamily: 'MontserratAlternates-Black',
    color: 'white',
  },
  btnClose: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  btn: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.15,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelAnswer: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-Black',
    color: 'black',
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ItemScreen;