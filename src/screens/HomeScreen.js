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

const dataBook = [
  {id: 1, image: images.aBalloonOnTheTall , bg: [images.aBalloonOnTheTallBg]},
  {id: 2, image: images.neverTellALie , bg: [images.neverTellALieBg]},
  {id: 3, image: images.theCatAndTheOldRat , bg: [images.theCatAndTheOldRatBg, images.theCatAndTheOldRatBg2]},
  {id: 4, image: images.theCrowAndThePitcher , bg: [images.theCrowAndThePitcherBg]},
  {id: 5, image: images.theHorseHunterAndStag , bg: [images.theHorseHunterAndStagBg, images.theHorseHunterAndStagBg2]},
  {id: 6, image: images.thePerfectHeart , bg: [images.thePerfectHeartBg, images.thePerfectHeartBg2, images.thePerfectHeartBg3, images.thePerfectHeartBg4]},
]

const HomeScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);

  const dispatch = useDispatch();

  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickStartButton = (item) => {
    if(points.value <= 0){
      Alert.alert("Please buy more turn!");
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Item", {background: item});
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bgstart}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.view} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image source={images.shortstory} style={appStyle.itemView} />
      <View style={appStyle.bottomView}>
        <FlatList
          data={dataBook}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity key={item.id} onPress={() => onClickStartButton(item.bg)}>
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
    justifyContent: 'space-between',
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
    color: 'white',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  itemView: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.18,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  bottomView: {
    flex: 0.8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;