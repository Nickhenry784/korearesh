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
const dataButton = [
  {id: 1, image: images.teaceremony, background: images.teamau}, 
  {id: 2, image: images.sakura, background: images.sakuramau}, 
  {id: 3, image: images.phusimoutain, background: images.mautea}, 
  {id: 4, image: images.kimono, background: images.kimonobackground}
];

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const onClickStartButton = (item) => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Item", {background: item});
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.buy} style={appStyle.scoreStyle} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={dataButton}
        style={{paddingTop: windowHeight * 0.2}}
        scrollEnabled={false}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => onClickStartButton(item.background)} key={item.id}>
            <Image source={item.image} style={appStyle.successImage} />
          </TouchableOpacity>
        )}
      />
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
  appBar: {
    paddingTop: 10,
    flex: 0.2,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bottomView: {
    height: windowHeight * 0.2,
    position: 'absolute',
    bottom: '0%',
    width: '70%',
    flexDirection: 'row',
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
  welcomeImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.1,
    resizeMode: 'cover',
  },
  bullImage: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    resizeMode: 'contain',
  },
  successImage: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.1,
    marginVertical: 10,
    resizeMode: 'contain',
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 20,
    color: '#0a98c9',
    fontWeight: 'bold',
  },
});

export default Home;