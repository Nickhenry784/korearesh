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
  {id: 1, image: images.apollo, background: images.apolloinfo},
  {id: 2, image: images.ares, background: images.aresinfo},
  {id: 3, image: images.demeter, background: images.demeterinfo},
  {id: 4, image: images.hades, background: images.hadesinfo},
  {id: 5, image: images.poseidon, background: images.poseidoninfo},
  {id: 6, image: images.zeus, background: images.zeusinfo},
];

const numCol = 2;

const HomeScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);

  const dispatch = useDispatch();

  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickStartButton = (backgrou) => {
    if(points.value <= 0){
      Alert.alert("Please buy more turn!");
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Item", {
      background: backgrou,
    });
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.buy} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image source={images.button} style={appStyle.labelImage} />
      <View style={appStyle.centerView}>
        <FlatList 
          data={brokenData}
          scrollEnabled={false}
          numColumns={numCol}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onClickStartButton(item.background)}>
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
    justifyContent: 'flex-start',
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
    width: windowWidth * 0.2,
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
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    resizeMode: 'contain',
    margin: 10,
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
    flex: 0.9,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
});

export default HomeScreen;