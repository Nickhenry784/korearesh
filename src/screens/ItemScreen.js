import { 
  StyleSheet, 
  Dimensions, 
  ScrollView,
  Text,
  ImageBackground, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const ItemScreen = ({navigation, route}) => {
  const {labelText} = route.params;

  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <ScrollView contentContainerStyle={{alignItems: 'center' ,  paddingHorizontal: 10}}>
        <Text style={appStyle.label}>{labelText}</Text>
      </ScrollView>
    </ImageBackground>
  );
};

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  welcomeImage: {
    width: windowWidth,
    height: windowHeight * 0.8,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 25,
    color: 'black',
  },
  startBtn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
});

export default ItemScreen;