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
import { images } from "../assets/images";
import { iconData } from "../assets/icon";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const points = useSelector(state => state.points);

  const onClickStartButton = (item) => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    const list = handleRandomListIcon();
    navigation.navigate("Play",{
      data: list,
    });
  }

  const handleRandomListIcon = () => {
    const list = [...iconData];
    // eslint-disable-next-line no-plusplus
    const list1 = list.concat(list);
    const list2 = list1.concat(list1);
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < list2.length; index++) {
      const element = list2[index];
      list2.splice(index, 1);
      list2.splice(randomIntFromInterval(0, 22), 0, element);
    }
    return list2;
  };


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.heart} style={appStyle.scoreStyle} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
        <Image source={images.quickandquick} style={appStyle.bullImage} />
        <Image source={images.guideplay} style={appStyle.popupImage} />

      <TouchableOpacity onPress={onClickStartButton}>
        <Image source={images.start} style={appStyle.startBtn} />
      </TouchableOpacity>
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
  appBar: {
    height: windowHeight * 0.1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  popupImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.5,
    resizeMode: 'contain',
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
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  okBtn: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  bottomView: {
    flex: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerView: {
    flex: 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  turnView: {
    width: windowWidth * 0.15,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bullImage: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.3,
    resizeMode: 'contain',
  },
  startBtn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  turnText: {
    fontSize: 50,
    color: 'blue',
    fontFamily: 'Mat Saleh',
    textAlign: 'center',
  },
  labelText: {
    fontSize: 25,
    color: 'blue',
    width: windowWidth * 0.8,
    textAlign: 'center',
    fontFamily: 'Mat Saled',
  },
});

export default Home;