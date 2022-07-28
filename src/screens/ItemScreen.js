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
  {id: 1, image: images.stamp1},
  {id: 2, image: images.stamp2},
  {id: 3, image: images.stamp3},
  {id: 4, image: images.stamp4},
  {id: 5, image: images.stamp5},
  {id: 6, image: images.stamp6},
  {id: 7, image: images.stamp7},
  {id: 8, image: images.stamp8},
  {id: 9, image: images.stamp9},
  {id: 10, image: images.stamp10},
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
          <Image source={images.buttonexit} style={appStyle.btnReturn} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.centerView}>
        <ImageBackground source={images.iconletters} style={appStyle.lettersImage}>
          <View style={appStyle.topView}>
            <Image source={dataStamp[index].image} style={appStyle.stampSmall} />
          </View>
        </ImageBackground>

        <Image source={dataStamp[index].image} style={appStyle.stampHigher} />
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickBackBtn()}>
          <Image source={images.buttonleft} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickNextBtn()}>
          <Image source={images.buttonright} style={appStyle.btn} />
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
    justifyContent: 'flex-start',
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
    right: '-3%',
  },
  stampHigher: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
  },
  stampSmall: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
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