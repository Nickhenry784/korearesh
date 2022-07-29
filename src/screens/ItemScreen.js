import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  Animated,
  SafeAreaView} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";
import { useRef } from "react";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataBg = [
  {id: 1, bg: images.ball},
  {id: 2, bg: images.fireball},
  {id: 3, bg: images.grassball},
  {id: 4, bg: images.iceball},
  {id: 5, bg: images.suprememagicball},
  {id: 6, bg: images.thunderball},
  {id: 7, bg: images.windball},
]

const ItemScreen = ({navigation, route}) => {

  const [index, setIndex] = useState(Math.floor(Math.random() * 6));
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [click, setClick] = useState(false);

  const fadeIn = () => {
    setClick(true);
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
  };

  const onClickAgainBtn = () => {
    setClick(false);
    setIndex(Math.floor(Math.random() * 6));
    fadeAnim.setValue(0);
  }

  return (

    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <SafeAreaView style={appStyle.homeView}>
        <View style={appStyle.closeview}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.buttonback} style={appStyle.btnReturn} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={appStyle.centerView} delayLongPress={5000} onLongPress={() => fadeIn()}/>
        {click && <View style={appStyle.ballView}>
          <Animated.Image source={dataBg[index].bg} style={[appStyle.btn,{ opacity: fadeAnim}]} />
          <TouchableOpacity onPress={() => onClickAgainBtn()}>
            <Image source={images.again} style={appStyle.btnReturn2} />
          </TouchableOpacity>
        </View>}
      </SafeAreaView>
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
  closeview: {
    position: 'absolute',
    top: '3%',
    left: '3%',
  },
  btn: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.6,
    resizeMode: 'contain',
  },
  btnReturn: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  btnReturn2: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
    marginTop: 30,
  },
  centerView: {
    width: windowWidth,
    height: windowHeight * 0.8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  ballView: {
    position: 'absolute',
    top: '30%',
    alignItems: 'center',
  },
});

export default ItemScreen;