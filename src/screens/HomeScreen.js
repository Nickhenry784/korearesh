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
  {id: 1, image: images.samuraiarenotjustwarriors, background: images.a3, title: "Samurai Are Not Just Warriors"},
  {id: 2, image: images.samuraiarepacifists, background: images.a6, title: "Samurai Are Pacifists"},
  {id: 3, image: images.samuraidoesntreallycomefromjapan, background: images.a4, title: "Samurai Doesn't Really Come From Japan"},
  {id: 4, image: images.samuraifightersalwaysnametheirswords, background: images.a5, title: "Samurai Fighters Always Name Their Words"},
  {id: 5, image: images.therearemoresamuraiouttherethanyouthink, background: images.a2, title: "There Are More Samurai Out There Than You Think"},
  {id: 6, image: images.thesamuraiswordisactuallyfromanothercountry, background: images.a1, title: "The Samurais Word Is Actually From Another Country"},
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);

  const dispatch = useDispatch();

  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickStartButton = (backgrou, titleN) => {
    if(points.value <= 0){
      Alert.alert("Please buy more turn!");
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Item", {
      background: backgrou,
      name: titleN,
    });
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.view} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image source={images.samuraimysteri} style={appStyle.labelImage} />
      <View style={appStyle.centerView}>
        <FlatList 
          data={brokenData}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onClickStartButton(item.background, item.title)}>
              <Image source={item.image} style={appStyle.itemView} />
            </TouchableOpacity>
          )}
        />
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
    justifyContent: 'flex-end',
    resizeMode: 'contain',
  },
  appBar: {
    position: 'absolute',
    top: '3%',
    left: '3%',
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
    width: windowWidth * 0.4,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  itemView: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  text: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'white',
  },
  labelImage: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  centerView: {
    height: windowHeight * 0.7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
});

export default HomeScreen;