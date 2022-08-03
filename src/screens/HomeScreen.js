import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  ImageBackground, 
  Image,
  FlatList, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const HomeScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);

  const dispatch = useDispatch();

  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickStartButton = () => {
    if(points.value <= 0){
      Alert.alert("Please buy more turn!");
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Item");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bgst}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <ImageBackground source={images.turn} style={appStyle.buyImage} >
            <Text style={appStyle.turnText}>{points.value}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickStartButton()}>
          <Image source={images.watch} style={appStyle.itemView} />
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
  appBar: {
    flex: 0.1,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    fontFamily: 'House Party',
    color: 'white',
  },
  buyImage: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brokenImage: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  itemView: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  bottomView: {
    flex: 0.3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneImage: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.7,
    resizeMode: 'contain',
    position: 'absolute',
    top: '0%',
  },
});

export default HomeScreen;