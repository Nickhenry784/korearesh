import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  ImageBackground, 
  Image,
  FlatList, 
  Alert,  
  Animated,
  Easing} from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";
import { useRef } from "react";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const CAT_WIDTH = windowWidth * 0.8;
const CAT_RATIO = 727 / 838;
const CAT_HEIGHT = CAT_WIDTH / CAT_RATIO;

const HAND_WIDTH = windowWidth * 0.18;
const HAND_RATIO = 177 / 391;
const HAND_HEIGHT = HAND_WIDTH / HAND_RATIO;

const ItemScreen = ({navigation, route}) => {
  const points = useSelector(state => state.points);
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const yAnimation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    rotateAnimation.setValue(0);
    yAnimation.setValue(0)
    Animated.timing(rotateAnimation, {
      toValue: 2,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => {
      startAnimation();
    });

    Animated.timing(yAnimation, {
      toValue: 2,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();

  }

  useEffect(() => {
    startAnimation();
  }, []);

  const rotateStyle = rotateAnimation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '180deg', '0deg']
  });

  const yStyle = yAnimation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, CAT_HEIGHT / 4, 0]
  });

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <View style={appStyle.appBar}>
          <View style={appStyle.turnView}>
            <Image source={images.turn} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.home} style={appStyle.buyImage} />
        </TouchableOpacity>
      </View>
      <ImageBackground source={images.meo} style={appStyle.brokenImage}>
        <Animated.View style={{
          transform: [
            {
              translateY: yStyle
            }
          ]
        }}>
          <Animated.Image source={images.tay} style={{
            position: 'absolute',
            top: CAT_HEIGHT / 6,
            left: 10,
            width: HAND_WIDTH,
            height: HAND_HEIGHT,
            resizeMode: 'contain',
            transform: [
                {
                  rotateX: rotateStyle
                },
              ]
            }}
          />
        </Animated.View>
      </ImageBackground>
    </ImageBackground>
  );
};

export const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);



export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  appBar: {
    position: 'absolute',
    top: '0%',
    width: windowWidth,
    height: windowHeight * 0.1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  brokenImage: {
    // marginTop: 60,
    width: CAT_WIDTH,
    height: CAT_HEIGHT,
    // resizeMode: 'contain',
  },

});

export default ItemScreen;