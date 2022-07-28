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

const dataBg = [
  {id: 1, bg: images.bg11},
  {id: 2, bg: images.bg2},
  {id: 3, bg: images.bg3},
  {id: 4, bg: images.bg4},
  {id: 5, bg: images.bg5},
  {id: 6, bg: images.bg6},
  {id: 7, bg: images.bg7},
  {id: 8, bg: images.bg8},
  {id: 9, bg: images.bg9},
  {id: 10, bg: images.bg10},
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
    <ImageBackground style={appStyle.homeView} source={dataBg[index].bg}>
      <View style={appStyle.closeview}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.buttonexit} style={appStyle.btnReturn} />
        </TouchableOpacity>
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
    top: '3%',
    left: '3%',
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