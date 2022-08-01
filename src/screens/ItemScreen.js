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
  {id: 1, bg: images.eyeboy1},
  {id: 2, bg: images.eyeboy2},
  {id: 3, bg: images.eyeboy3},
  {id: 4, bg: images.eyeboy4},
  {id: 5, bg: images.mouthboy1},
  {id: 6, bg: images.mouthboy2},
  {id: 7, bg: images.mouthboy3},
  {id: 8, bg: images.mouthboy4},
  {id: 9, bg: images.noseboy1},
  {id: 10, bg: images.noseboy2},
  {id: 11, bg: images.noseboy3},
  {id: 12, bg: images.noseboy4},
]

const ItemScreen = ({navigation, route}) => {

  const [index, setIndex] = useState(0);
  const [eye, setEye] = useState(null);
  const [mouth, setMouth] = useState(null);
  const [nose, setNose] = useState(null);

  const onClickNextBtn = () => {
    if(index !== 9){
      setIndex(index + 1);
    }
  }

  const onClickCloseBtn = () => {
    navigation.goBack();
  }

  const onClickBackBtn = () => {
    if(index !== 0){
      setIndex(index - 1);
    }
  }

  const onClickItemBtn = (id) => {
    if(id <= 3){
      setEye(dataBg[id].bg);
    }else if(id<=7){
      setMouth(dataBg[id].bg);
    } else{
      setNose(dataBg[id].bg);
    }
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.closeView}>
        <TouchableOpacity onPress={() => onClickCloseBtn()}>
          <Image source={images.btnback} style={appStyle.btnClose} />
        </TouchableOpacity>
      </View>
      <ImageBackground source={images.faceboy} style={appStyle.faceImage} >
        {eye !== null && <View style={appStyle.eyeView}>
          <Image source={eye} style={appStyle.eyeImage} />
        </View>}
        {nose !== null && <View style={appStyle.noiseView}>
          <Image source={nose} style={appStyle.noseImage} />
        </View>}
        {mouth !== null && <View style={appStyle.monthView}>
          <Image source={mouth} style={appStyle.mouthImage} />
        </View>}
      </ImageBackground>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickBackBtn()}>
          <Image source={images.btnletf} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickItemBtn(index)}>
          <Image source={dataBg[index].bg} style={appStyle.btn} />
        </TouchableOpacity>
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
  faceImage: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.5,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  eyeView: {
    position: 'absolute',
    top: '30%',
  },
  monthView: {
    position: 'absolute',
    top: '58%',
  },
  noiseView: {
    position: 'absolute',
    top: '43%',
  },
  closeView: {
    position: 'absolute',
    top: '3%',
    left: '3%',
  },
  btnClose: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  btn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  eyeImage: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  noseImage: {
    width: windowWidth * 0.15,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  mouthImage: {
    width: windowWidth * 0.2,
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