/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Image,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '../assets';
import Sound from 'react-native-sound';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataBg = [
  {id: 1, bg: images.banana, music: 'banana.mp3'},
  {id: 2, bg: images.carrot, music: 'carrot.mp3'},
  {id: 3, bg: images.cauliflower, music: 'cauliflower.mp3'},
  {id: 4, bg: images.cucumber, music: 'cucumber.mp3'},
  {id: 5, bg: images.eggplant, music: 'eggplant.mp3'},
  {id: 6, bg: images.mango, music: 'mango.mp3'},
  {id: 7, bg: images.onion, music: 'onion.mp3'},
  {id: 8, bg: images.orange, music: 'orange.mp3'},
  {id: 9, bg: images.pineapple, music: 'pineapple.mp3'},
  {id: 10, bg: images.strawberry, music: 'strawberry.mp3'},
  {id: 11, bg: images.tomato, music: 'tomato.mp3'},
]


Sound.setCategory('Playback');

var whoosh = new Sound('banana.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  whoosh.setVolume(1);
});

const PlayScreen = ({navigation, route}) => {
  const [index, setIndex] = useState(0);
  const [soundPlay, setSoundPlay] = useState(whoosh);

  
  const onClickLeftBtn = () => {
    if (index !== 0) {
      setIndex(index - 1);
    }
    var whoosh = new Sound(dataBg[index - 1].music, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      whoosh.setVolume(1);
    });
    setSoundPlay(whoosh);
  };

  const onClickRightBtn = () => {
    if (index !== dataBg.length - 1) {
      setIndex(index + 1);
    }
    var whoosh = new Sound(dataBg[index + 1].music, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      whoosh.setVolume(1);
    });
    setSoundPlay(whoosh);
  };

  const onClickCloseBtn = () => {
    navigation.goBack();
    soundPlay.release();
  };

  const onClickPlayBtn = () => {
    soundPlay.play();
  };

  const onClickPauseBtn = () => {
    soundPlay.pause();
  };
  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <View style={appStyle.closeView}>
        <TouchableOpacity onPress={() => onClickCloseBtn()}>
          <Image source={images.buttonback} style={appStyle.btnCl} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.centerView}>
        <Image source={dataBg[index].bg} style={appStyle.waterImage} />
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickLeftBtn()}>
          <Image source={images.buttonletf} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickPlayBtn()}>
          <Image source={images.play} style={appStyle.btn1} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickPauseBtn()}>
          <Image source={images.pause} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickRightBtn()}>
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
    width: '100%',
    height: windowHeight * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnClose: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.5,
    resizeMode: 'contain',
  },
  btnCl: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
  },
  waterImage: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
  },
  btn: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
  },
  btn1: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.3,
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

export default PlayScreen;