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
  {id: 1, bg: images.chest1},
  {id: 2, bg: images.img2},
  {id: 3, bg: images.img3},
  {id: 4, bg: images.img4},
  {id: 5, bg: images.img5},
  {id: 6, bg: images.img6},
  {id: 7, bg: images.img7},
  {id: 8, bg: images.img8},
  {id: 9, bg: images.img9},
  {id: 10, bg: images.img10},
]

const ItemScreen = ({navigation, route}) => {

  const [index, setIndex] = useState(0);
  const [play, setPlay] = useState(false);
  const [deg, setDeg] = useState(0);
  const [time, setTime] = useState(Math.floor(Math.random() * 20 + 10));

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(time > 0 && play){
        setTime(time - 1);
        setDeg(Math.floor(Math.random() * 10 - 10));
      }
      if(time === 0 && play){
        setIndex(Math.floor(Math.random() * 9 + 1));
        setPlay(false);
        setTime(Math.floor(Math.random() * 20 + 10));
        setTimeout(() => {
          setIndex(0);
        }, 5000);
        clearTimeout(timeOut);
      }
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    }
  }, [time, play]);

  const onClickChestBtn = () => {
    setPlay(true);
  };

  const onClickCloseBtn = () => {
    navigation.goBack();
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg2}>
      <View style={appStyle.centerView}>
        <TouchableOpacity disabled={play} onPress={() => onClickChestBtn()}>
          <Animated.Image source={dataBg[index].bg} style={[appStyle.btnClose, {
              transform: [{
                rotate: `${deg} deg`,
              }]
            }]} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickCloseBtn()}>
          <Image source={images.buttonhome} style={appStyle.btn} />
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
  centerView: {
    width: '100%',
    height: windowHeight * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnClose: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.3,
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
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default ItemScreen;