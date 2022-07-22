import { 
  StyleSheet, 
  View, Dimensions, 
  Animated,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataBg = [
  {id: 1, bg: images.img1},
  {id: 2, bg: images.img2},
  {id: 3, bg: images.img3},
  {id: 4, bg: images.img4},
  {id: 5, bg: images.img5},
  {id: 6, bg: images.img6},
  {id: 7, bg: images.img7},
  {id: 8, bg: images.img8},
  {id: 9, bg: images.img9},
]

const dataWater = [
  {id: 1, bg: images.waterspray},
  {id: 2, bg: images.waterspray2},
  {id: 3, bg: images.waterspray3},
  {id: 4, bg: images.waterspray4},
  {id: 5, bg: images.waterspray5},
  {id: 6, bg: images.waterspray6},
  {id: 7, bg: images.waterspray7},
  {id: 8, bg: images.waterspray8},
  {id: 9, bg: images.waterspray9},
]

const ItemScreen = ({navigation, route}) => {

  const [index, setIndex] = useState(0);
  const [indexWater, setIndexWater] = useState(0);

  useEffect(() => {
    const timeOut = setInterval(() => {
      setIndexWater(Math.floor(Math.random() * 8));
    }, 500);
    return () => {
      clearInterval(timeOut);
    }
  }, [indexWater]);

  const onClickLeftBtn = () => {
    if(index !== 0){
      setIndex(index - 1);
    }
  };

  const onClickRightBtn = () => {
    if(index !== dataBg.length - 1){
      setIndex(index + 1);
    }
  }

  const onClickCloseBtn = () => {
    navigation.goBack();
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.closeView}>
        <TouchableOpacity onPress={() => onClickCloseBtn()}>
          <Image source={images.buttonexit} style={appStyle.btnCl} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.centerView}>
        <View style={appStyle.waterView}>
          <Image source={dataWater[indexWater].bg} style={appStyle.waterImage} />
        </View>
        <Image source={dataBg[index].bg} style={appStyle.btnClose} />
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickLeftBtn()}>
          <Image source={images.arrowleft} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickRightBtn()}>
          <Image source={images.arrowright} style={appStyle.btn} />
        </TouchableOpacity>
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
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  closeView: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: windowWidth * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '5%',
    left: '5%',
    backgroundColor: 'white',
  },
  centerView: {
    width: '70%',
    height: windowHeight * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  waterView: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    position: 'absolute',
    top: '8%',
    left: '0%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  btnClose: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.5,
    resizeMode: 'contain',
  },
  btnCl: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  waterImage: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.08,
    resizeMode: 'contain',
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