import { View, StyleSheet, TouchableOpacity,Text, Dimensions, FlatList, Image, Alert, ImageBackground, ScrollView  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const clickStartButton = () => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
  }


  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <ImageBackground source={images.background} style={appStyle.homeView}>
        <Text>Hello</Text>
      </ImageBackground>
    </ScrollView>
  );
};



export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'contain',
  },
  turnView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  turnText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  shopImage: {
    width: windowWidth * 0.7,
    height: windowWidth > 640 ? windowHeight * 0.7 : windowHeight * 0.6,
    resizeMode: 'contain',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: windowWidth > 640 ? 30 : 16,
    color: 'white',
    fontWeight: 'bold',
  },
  itemView: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.15,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  itemImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  textlabel: {
    marginTop: windowHeight * 0.1,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: windowHeight * 0.05,
  },
  buttonStyle: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    resizeMode: 'contain',
  }
});

export default Home;