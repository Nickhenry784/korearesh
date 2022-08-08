import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  Text} from "react-native";
import React, {useEffect, useState} from 'react';
import { images, jsonfile } from "../assets";
import { useSelector } from "react-redux";
import Lottie from 'lottie-react-native';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const ItemScreen = ({navigation, route}) => {

  const [index, setIndex] = useState(0);

  const points = useSelector(state => state.points);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setIndex(randomIntFromInterval(0,300));
    }, 3000);
    return () => {
      clearInterval(timeInterval);
    }
  },[index])


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <ScrollView style={{width: windowWidth}} contentContainerStyle={{alignItems: 'center'}}>
        <View style={appStyle.appBar}>
          <View style={appStyle.turnView}>
              <Image source={images.turn} style={appStyle.buyImage} />
              <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.home} style={appStyle.buyImage} />
          </TouchableOpacity>
        </View>
        <ImageBackground source={images.h1} style={appStyle.h1Image}>
          <Text style={appStyle.textNumber}>{index}</Text>
        </ImageBackground>
        <View style={appStyle.centerView}>
          <View style={appStyle.leftView}>
            <Image source={images.h2} style={appStyle.h2Image} />
            <ImageBackground source={images.earth} style={appStyle.earth}>
              <Lottie source={jsonfile.fire} autoPlay loop/>
            </ImageBackground>
          </View>
          <View style={appStyle.leftView}>
            <Lottie source={jsonfile.scan} autoPlay loop style={{width: windowWidth * 0.3, height: windowWidth * 0.3}}/>
            <ImageBackground source={images.khungscan2} style={appStyle.khungscan2}>
              <Lottie source={jsonfile.scan2} autoPlay loop/>
            </ImageBackground>
          </View>
        </View>
        <View style={appStyle.bottomView}>
          <ImageBackground source={images.khungwave} style={appStyle.khungwave}>
            <Lottie source={jsonfile.wave1} autoPlay loop/>
          </ImageBackground>
          <ImageBackground source={images.khungball} style={appStyle.khungball}>
            <Lottie source={jsonfile.ball1} autoPlay loop/>
          </ImageBackground>
        </View>
      </ScrollView>
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
  h2Image: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  khungscan2: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
  },
  earth: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.5,
    resizeMode: 'contain',
  },
  khungball: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  khungwave: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.15,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerView: {
    width: windowWidth,
    height: windowHeight * 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftView: {
    width: windowWidth * 0.45,
    alignItems: 'center',
  },
  textNumber: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  h1Image: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  turnText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  appBar: {
    height: windowHeight * 0.1,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default ItemScreen;