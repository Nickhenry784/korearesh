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


const PlayScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);

  const [second, setSecond] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hour, setHour] = useState(0);
  const [popup, setPopup] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(start && second > 0 && minutes >= 0 && hour >= 0 ){
        setSecond(second - 1);
      }
      if(start && second === 0 && minutes > 0 && hour >= 0 ){
        setSecond(60);
        setMinutes(minutes - 1);
      }
      if(start && minutes === 0 && hour > 0 && second === 0){
        setMinutes(60);
        setSecond(60);
        setHour(hour - 1);
      }
      if(start && second === 0 && minutes === 0 && hour === 0 ){
        setStart(false);
        clearTimeout(timeOut);
      };
    },1000);

    return() => {
      clearTimeout(timeOut);
    }
  },[second,start]);





  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.turn} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={images.home} style={appStyle.buyImage} />
        </TouchableOpacity>
      </View>
      <Text style={appStyle.textStyle}>{`${hour < 10 ? `0${hour}`: hour} : ${minutes < 10 ? `0${minutes}`: minutes} : ${second < 10 ? `0${second}`: second}`}</Text>
      <View style={appStyle.bottomView1}>
        <TouchableOpacity onPress={() => setPopup(true)}>
          <Image source={images.settime} style={appStyle.brokenImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStart(true)}>
          <Image source={images.btbamgio} style={appStyle.brokenImage} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity>
          <Image source={images.bamgio} style={appStyle.buyImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Item")}>
          <Image source={images.xemgio} style={appStyle.buyImage} />
        </TouchableOpacity>
      </View>
      {popup && (
      <View style={appStyle.popupView}>
        <View style={appStyle.popupImage}>
          <Text style={appStyle.labelText}>SET TIME</Text>
          <View style={appStyle.closeView}>
            <TextInput
              style={appStyle.input}
              onChangeText={setHour}
              value={hour}
              keyboardType="numeric"
            />
            <Text style={appStyle.labelText}>:</Text>
            <TextInput
              style={appStyle.input}
              onChangeText={setMinutes}
              value={minutes}
              keyboardType="numeric"
            />
            <Text style={appStyle.labelText}>:</Text>
            <TextInput
              style={appStyle.input}
              onChangeText={setSecond}
              value={second}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity onPress={() => setPopup(false)}>
            <Image source={images.OK} style={appStyle.brokenImage} />
          </TouchableOpacity>
        </View>
      </View>)}
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
  closeView: {
    width: '100%',
    height: windowHeight * 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  popupImage: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
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
  appBar: {
    flex: 0.1,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 50,
    fontFamily: 'alarm clock',
    color: '#08fcfc',
  },
  labelText: {
    fontSize: 30,
    fontFamily: 'alarm clock',
    color: '#08fcfc',
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
    fontFamily: 'alarm clock',
    color: '#08fcfc',
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
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  bottomView1: {
    height: windowHeight * 0.13,
    borderTopColor: 'white',
    borderTopWidth: 2,
    width: '100%',
    padding:20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: '20%',
  },
  bottomView: {
    height: windowHeight * 0.13,
    borderTopColor: 'white',
    borderTopWidth: 2,
    width: '100%',
    padding:20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phoneImage: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.7,
    resizeMode: 'contain',
    position: 'absolute',
    top: '0%',
  },
});

export default PlayScreen;