import { 
  StyleSheet, 
  View, Dimensions, 
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  Text,
  Animated} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const ItemScreen = ({navigation, route}) => {

  const [time, setTime] = useState(randomIntFromInterval(300,500));
  const [deg, setDeg] = useState(0);
  const [play, setPlay] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(play && time > 0){
        if(deg === 360){
          setDeg(0);
        }else{
          setDeg(deg + 10);
        }
        setTime(time - 1);
      }
      if(play && time === 0){
        setPlay(false);
        setTimeout(() => {
          setPopup(true);
        },5000)
      }

      return () => {
        clearTimeout(timeOut);
      }
    }, 1);
  },[time,play]);

  const onClickBtn = () => {
    setPopup(false);
    setTime(randomIntFromInterval(300,500));
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <View style={appStyle.backBtn}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.home} style={appStyle.btnBack} />
        </TouchableOpacity>
      </View>
      <Animated.Image source={images.chai} style={{
        width: windowWidth * 0.5,
        height: windowWidth * 0.5,
        resizeMode: 'contain',
        transform: [
          {
            rotate: `${deg}deg`
          }
        ]
      }} />
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => setPlay(true)}>
          <Image source={images.Spin} style={appStyle.btn} />
        </TouchableOpacity>
      </View>
      {popup && (
      <View style={appStyle.popupView}>
        <ImageBackground style={appStyle.popupImage} source={images.bang}>
          <View style={appStyle.scoreView}>
            <TouchableOpacity onPress={() => onClickBtn()}>
              <Image source={images.Truth} style={appStyle.foodImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickBtn()}>
              <Image source={images.Dare} style={appStyle.foodImage} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>)}
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
  popupImage: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  scoreView: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    width: windowWidth * 0.3,
    height: windowWidth * 0.1,
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