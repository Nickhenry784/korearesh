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

const brokenData= [
  {id: 1, image: images.a1},
  {id: 2, image: images.a2},
  {id: 3, image: images.a3},
  {id: 4, image: images.a4},
  {id: 5, image: images.a5},
  {id: 6, image: images.a6},
  {id: 7, image: images.a7},
  {id: 8, image: images.a8},
  {id: 9, image: images.a9},
  {id: 10, image: images.a10},
  {id: 11, image: images.a11},
  {id: 12, image: images.a12},
  {id: 13, image: images.a13},
  {id: 14, image: images.a14},
  {id: 15, image: images.a15},
];

const ItemScreen = ({navigation, route}) => {

  const {item} = route.params;

  useEffect(() => {
    console.log(item)
  },[])

  const onClickAgainButton = () => {
    navigation.goBack();
  }



  return (
    <ImageBackground style={appStyle.homeView} source={images.background2}>
      <Image source={images.crow} style={appStyle.labelImage} />
      <View style={appStyle.image1View}>
        <Image source={item[0].image} style={appStyle.img} />
      </View>
      <View style={appStyle.image2View}>
        <Image source={item[1].image} style={appStyle.img} />
      </View>
      <View style={appStyle.btnView}>
        <TouchableOpacity onPress={() => onClickAgainButton()}>
          <Image source={images.reset} style={appStyle.brokenImage} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  image2View: {
    position: 'absolute',
    top: '40%',
    right: '20%',
  },
  btnView: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '10%',
  },
  img: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  appBar: {
    position: 'absolute',
    top: '3%',
    left: '3%',
  },
  image1View: {
    position: 'absolute',
    top: '45%',
    left: '20%',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'black',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  brokenImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  itemView: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    margin: 10,
    resizeMode: 'contain',
  },
  text: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'white',
  },
  labelImage: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.5,
    resizeMode: 'contain',
  },
  centerView: {
    height: windowHeight * 0.35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
});

export default ItemScreen;