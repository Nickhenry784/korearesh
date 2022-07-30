import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions, 
  ImageBackground, 
  Image,
  FlatList, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";
import Sound from 'react-native-sound';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

Sound.setCategory('Playback');

var whoosh = new Sound('tiengbokeu.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  whoosh.setVolume(1);
});

const dataBg = [
  {id: 1, bg: images.btncat, music: 'tiengmeokeu.mp3'},
  {id: 2, bg: images.btncow, music: 'tiengbokeu.mp3'},
  {id: 3, bg: images.btndog, music: 'tiengchosua.mp3'},
  {id: 4, bg: images.btneagle, music: 'tiengdaibang.mp3'},
  {id: 5, bg: images.btnhorse, music: 'tiengnguahi.mp3'},
  {id: 6, bg: images.btngecko, music: 'tiengcontatke.mp3'},
]

const numCol = 2;

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const [popup, setPopup] = useState(false);
  const [sound, setSound] = useState(whoosh);

  const onClickStartButton = () => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    sound.play();
  }

  const onClickItemBtn = (val) => {
    var whoosh = new Sound(val, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      whoosh.setVolume(1);
    });
    setSound(whoosh);
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.buttonbuy} style={appStyle.scoreStyle} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPopup(true)}>
          <Image source={images.note} style={appStyle.buyImage} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => onClickStartButton()}>
        <Image source={images.buttonloudspeaker} style={appStyle.bullImage} />
      </TouchableOpacity>
      <FlatList 
        data={dataBg}
        scrollEnabled={false}
        numColumns={numCol}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => onClickItemBtn(item.music)} key={item.id}>
            <Image source={item.bg} style={appStyle.startBtn} />
          </TouchableOpacity>
        )}
      />
      {popup && (
      <View style={appStyle.popupView}>
        <ImageBackground style={appStyle.popupImage} source={images.board}>
          <View style={appStyle.closeView}>
            <TouchableOpacity onPress={() => setPopup(false)}>
              <Image source={images.buttonexit} style={appStyle.okBtn} />
            </TouchableOpacity>
          </View>
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
    justifyContent: 'space-between',
    resizeMode: 'cover',
  },
  closeView: {
    position: 'absolute',
    top: '3%',
    right: '5%',
  },
  appBar: {
    flex: 0.1,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  okBtn: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  bottomView: {
    flex: 0.2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerView: {
    flex: 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  turnView: {
    width: windowWidth * 0.15,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bullImage: {
    marginVertical: 20,
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    resizeMode: 'contain',
  },
  startBtn: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    resizeMode: 'contain',
    margin: 10,
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  turnText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Home;