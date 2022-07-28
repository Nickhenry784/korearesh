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
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataStamp = [
  {id: 1, image: images.red, traffic: images.traffic_light_red},
  {id: 2, image: images.yellow, traffic: images.traffic_light_yellow},
  {id: 3, image: images.green, traffic: images.traffic_light_green},
]

const ItemScreen = ({navigation, route}) => {

  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(20);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(time > 0){
        setTime(time - 1);
      }
      if(time === 0){
        if(index === 2){
          setPopup(true);
        }else{
          setTime(20);
          setIndex(index + 1);
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    }
  },[time]);

  const onClickAgainBtn = () => {
    setPopup(false);
    setTime(20);
    setIndex(0);
  };


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.closeview}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.back} style={appStyle.okBtn} />
        </TouchableOpacity>
      </View>
      <Text style={appStyle.timeText}>{time}</Text>
      <View style={appStyle.centerView}>
        <Image source={dataStamp[index].image} style={appStyle.stampHigher} />
        <Image source={dataStamp[index].traffic} style={appStyle.stampHigher} />
      </View>
      {popup && (
      <View style={appStyle.popupView}>
        <ImageBackground style={appStyle.popupImage} source={images.inf_board}>
          <Text style={appStyle.turnText}>Play Again!</Text>
          <TouchableOpacity onPress={() => onClickAgainBtn()}>
            <Image source={images.button_return} style={appStyle.okBtn} />
          </TouchableOpacity>
        </ImageBackground>
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
    justifyContent: 'flex-end',
    resizeMode: 'cover',
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
  popupImage: {
    width: windowWidth,
    height: windowHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 50,
    color: 'red',
  },
  turnText: {
    fontSize: 30,
    color: 'white',
  },
  okBtn: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  closeview: {
    position: 'absolute',
    top: '0%',
    left: '3%',
  },
  centerView: {
    width: windowWidth,
    height: windowHeight * 0.6,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  lettersImage: {
    width: windowWidth,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  stampHigher: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  btn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  btnReturn: {
    width: windowWidth * 0.1,
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