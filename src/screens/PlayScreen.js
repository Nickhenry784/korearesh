/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Image,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '../assets';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;



const PlayScreen = ({navigation, route}) => {
  const {name} = route.params;

  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(() =>{
      if(second < 60){
        setSecond(second + 1);
      }
      if(second === 60){
        setSecond(0);
        setMinute(minute + 1);
      }
    },1000);
    return () => {
      clearTimeout(timeOut);
    }
  },[second, minute]);



  return (
    <ImageBackground style={appStyle.homeView} source={images.bg2}>
      <View style={appStyle.topView}>
        <Text style={appStyle.nameStyle}>{name}</Text>
        <Text style={appStyle.mobileText}>Mobile</Text>
      <Text style={appStyle.mobileText}>{`${minute < 10 ? `0${minute}` : minute} : ${second < 10 ? `0${second}` : second}`}</Text>
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={images.cancel} style={appStyle.btnImage}/>
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
    justifyContent: 'space-between',
    resizeMode: 'cover',
  },
  topView: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  mobileText: {
    color: 'white',
    fontSize: 20,
  },
  bottomView: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageView: {
    width: '100%',
    height: windowHeight * 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnImage: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
  },
  btnImage1: {
    width: windowWidth * 0.18,
    height: windowHeight * 0.18,
    resizeMode: 'contain',
  },
});

export default PlayScreen;