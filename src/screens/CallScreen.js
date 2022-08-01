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
import Sound from 'react-native-sound';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

Sound.setCategory('Playback');

var whoosh = new Sound('nhacchuong.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  whoosh.setVolume(1);
  whoosh.setNumberOfLoops(-1);
});

const CallScreen = ({navigation, route}) => {
  const {value} = route.params;

  useEffect(() => {
    whoosh.play();
  },[]);

  const goBack = () => {
    navigation.goBack();
    whoosh.pause();
  }

  const answer = () => {
    navigation.navigate("Play",{name: value});
    whoosh.stop();
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.bggoiden}>
      <View style={appStyle.topView}>
        <Text style={appStyle.nameStyle}>{value}</Text>
        <Text style={appStyle.mobileText}>Mobile</Text>
      </View>
      <View style={appStyle.bottomView}>
        <View style={appStyle.imageView}>
          <Image source={images.remindme} style={appStyle.btnImage1}/>
          <Image source={images.mesage} style={appStyle.btnImage1}/>
        </View>
        <View style={appStyle.imageView}>
          <TouchableOpacity onPress={() => goBack()}>
            <Image source={images.deceline} style={appStyle.btnImage}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => answer()}>
            <Image source={images.answer} style={appStyle.btnImage}/>
          </TouchableOpacity>
        </View>
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
    height: windowHeight * 0.4,
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

export default CallScreen;