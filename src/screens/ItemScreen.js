import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataStamp = [
  {id: 1, image: images.feeling1},
  {id: 2, image: images.feeling2},
  {id: 3, image: images.feeling3},
  {id: 4, image: images.feeling4},
  {id: 5, image: images.feeling5},
  {id: 6, image: images.feeling6},
  {id: 7, image: images.feeling7},
  {id: 8, image: images.feeling8},
  {id: 9, image: images.feeling9},
  {id: 10, image: images.feeling10},
]

const ItemScreen = ({navigation, route}) => {

  const [index, setIndex] = useState(0);

  const onClickNextBtn = () => {
    if(index !== 9){
      setIndex(index + 1);
    }
  }

  const onClickBackBtn = () => {
    if(index !== 0){
      setIndex(index - 1);
    }
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.closeview}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.btnback} style={appStyle.btnReturn} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.centerView}>
        <ImageBackground source={images.iconlaptop} style={appStyle.lettersImage}>
          <View style={appStyle.topView}>
            <Image source={dataStamp[index].image} style={appStyle.stampSmall} />
          </View>
        </ImageBackground>
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickBackBtn()}>
          <Image source={images.btnleft} style={appStyle.btn} />
        </TouchableOpacity>
        <Image source={dataStamp[index].image} style={appStyle.stampHigher} />
        <TouchableOpacity onPress={() => onClickNextBtn()}>
          <Image source={images.btnright} style={appStyle.btn} />
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
  closeview: {
    position: 'absolute',
    top: '0%',
    left: '3%',
  },
  centerView: {
    width: windowWidth,
    height: windowHeight * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lettersImage: {
    width: windowWidth,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  topView: {
    position: 'absolute',
    top: '5%',
  },
  stampHigher: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
  },
  stampSmall: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
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