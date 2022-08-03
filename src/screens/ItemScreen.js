import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  ImageBackground, 
  Image,
  FlatList, 
  Alert,  
  TextInput} from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const ItemScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);

  const [nam, setNam] = useState("");
  const [nu, setNu] = useState("");
  const [randomNumber, setRandomNumber] = useState(0);
  const [play, setPlay] = useState(false);
  const [time, setTime] = useState(randomIntFromInterval(100,200));


  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(play && time > 0){
        setTime(time - 1);
        setRandomNumber(randomIntFromInterval(0,100));
      }
      if(play && time === 0 ){
        setPlay(false);
        setTime(randomIntFromInterval(100,200));
        setTimeout(() => {
          setRandomNumber(0);
        },3000);
      }
    },100);
    return () => {
      clearTimeout(timeOut);
    }
  } ,[play, time]);

  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickPlayBtn = () => {
    if(nu === "" || nam === ""){
      Alert.alert("Please input name!");
      return false;
    }
    setPlay(true);
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <ImageBackground source={images.turn} style={appStyle.buyImage} >
            <Text style={appStyle.turnText}>{points.value}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.home} style={appStyle.buyImage} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.itemView}>
        <Image source={images.nam} style={appStyle.nameImage} />
        <TextInput
          style={appStyle.input}
          onChangeText={setNam}
          placeholder= {"Text here"}
          value={nam}
        />
      </View>
      <ImageBackground style={appStyle.heartView} source={images.tim}>
        {randomNumber !== 0 && <Text style={appStyle.textStyle}>{`${randomNumber}%`}</Text>}
      </ImageBackground>
      <View style={appStyle.itemView}>
        <Image source={images.nu} style={appStyle.nameImage} />
        <TextInput
          style={appStyle.input}
          placeholder= {"Text here"}
          onChangeText={setNu}
          value={nu}
        />
      </View>
      <TouchableOpacity onPress={() => onClickPlayBtn(true)}>
        <Image source={images.watch} style={appStyle.watchImage} />
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
  input: {
    height: 40,
    borderWidth: 1,
    width: windowWidth * 0.6,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    fontSize: 25,
    fontFamily: 'House Party',
    color: 'black',
  },
  textStyle: {
    fontFamily: 'House Party',
    fontSize: 100,
    color: 'white',
  },
  heartView: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBar: {
    height: windowHeight * 0.1,
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
  watchImage: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  itemView: {
    width: windowWidth,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  nameImage: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    resizeMode: 'contain',
  },
});

export default ItemScreen;