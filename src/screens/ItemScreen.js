import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  Animated} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


const ItemScreen = ({navigation, route}) => {

  const [deg, setDeg] = useState(0);

  const [play, setPlay] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(play && deg !== 390){
        setDeg(deg + 30);
      }
      if(play && deg === 390){
        setDeg(30);
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    }
  },[play, deg])


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <View style={appStyle.exitBtn}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.btnback} style={appStyle.backImage} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.centerView}>
        <Animated.Image source={images.moon} style={[appStyle.moonImage,{
            transform: [{
              rotate: `${deg}deg`
            }]
          }]}/>
        <View style={appStyle.earthView}>
          <Image source={images.earth} style={appStyle.earthImage} />
        </View>
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => setPlay(!play)}>
          <Image source={!play ? images.btnplay : images.btnpause} style={appStyle.btn} />
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
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  btn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  centerView: {
    width: windowWidth,
    height: windowHeight * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earthImage: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    resizeMode: 'contain',
  },
  earthView: {
    position: 'absolute',
    top: '35%',
  },
  moonImage: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitBtn: {
    position: 'absolute',
    top: '5%',
    left: '5%',
  },
  backImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
});

export default ItemScreen;