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
const dataButton = [
  {id: 1, image: images.teaceremony, background: images.teamau}, 
  {id: 2, image: images.sakura, background: images.sakuramau}, 
  {id: 3, image: images.phusimoutain, background: images.mautea}, 
  {id: 4, image: images.kimono, background: images.kimonobackground}
];

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
    for (let index = 0; index < 5; index++) {
      list.splice(randomIntFromInterval(0, list.length - 1), 1);
    }
    const list1 = [...list];
    const list2 = list.concat(list1);
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
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.heart} style={appStyle.scoreStyle} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={appStyle.centerView}>
        <Text style={appStyle.labelText}>You have to choose the same pairs of pictures to win</Text>
        <Text style={appStyle.labelText}>Are you ready?</Text>
        <TouchableOpacity onPress={onClickStartButton}>
          <Image source={images.start} style={appStyle.startBtn} />
        </TouchableOpacity>
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
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  appBar: {
    position: 'absolute',
    width: '100%',
    top: '0%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  popupImage: {
    width: windowWidth,
    height: windowHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    resizeMode: 'contain',
  },
  startBtn: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  turnText: {
    fontSize: 30,
    color: 'red',
    fontFamily: 'Mat Saled',
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