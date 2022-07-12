import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  ImageBackground, 
  Image,
  Animated,
  TextInput, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const HomeScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const [modalState, setModalState] = useState(false);
  const [time, setTime] = useState(0);
  const [randomClound, setRandomClound] = useState([70,8]);
  const [randomAstro, setRandomAstro] = useState(10);
  const [randomRotate, setRandomRotate] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [second, setSecond] = useState(0);
  const [start, setStart] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(start && second > 0 && minutes >= 0 && time >= 0 ){
        setSecond(second - 1);
        setRandomAstro(Math.floor(7 + Math.random() * 8));
        randomClound[0] = Math.floor(70 + Math.random() * 10);
        randomClound[1] = Math.floor(5 + Math.random() * 12);
        setRandomRotate(Math.floor(Math.random() * 360));
      };
      if(start && second === 0 && minutes > 0 && time >= 0 ){
        setSecond(60);
        setMinutes(minutes - 1);
      }
      if(start && minutes === 0 && time > 0 && second === 0){
        setMinutes(60);
        setSecond(60);
        setTime(time - 1);
      }
      if(start && second === 0 && minutes === 0 && time === 0 ){
        setStart(false);
        clearTimeout(timeOut);
      };
    },1000);

    return() => {
      clearTimeout(timeOut)
    }
  },[second,start]);

  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickStartButton = () => {
    if(points === 0){
      Alert.alert("Please buy more turn!");
      return false;
    }
    if(minutes === 0){
      setModalState(true);
    } else{
      setStart(true);
    }
    
  }

  const onClickOKButton = () => {
    setModalState(false);
    dispatch(decrement());
    setStart(true);
  }

  const onClickBackButton = () => {
    setModalState(false);
  }

  const onClickPauseBtn = () => {
    setStart(!start);
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.clockbuy} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={appStyle.centerView}>
        <Animated.Image source={images.bottleBig} style={[appStyle.sunImage,{
          position: 'absolute',
          top: `${randomAstro} %`,
          transform: [
            {
              rotate: '180deg',
            }
          ]
        }]} />
        <Animated.Image source={images.koicricle} style={[appStyle.earthImage,{
          position: 'absolute',
          top: '30%',
          transform: [{
            rotate: `${randomRotate} deg`
          }],
        }]} />
        <Animated.Image source={images.koi2} style={[appStyle.sunImage, {
          position: 'absolute',
          top: `${randomClound[0]} %`,
          right: `${randomClound[1]} %`,
        }]} />
        <Animated.Image source={images.koi1} style={[appStyle.sunImage, {
          position: 'absolute',
          top: `${randomClound[0]} %`,
          left: `${randomClound[1]} %`,
        }]} />
        {start && <Text style={appStyle.timeText}>{`${time} : ${minutes} : ${second}`}</Text>}
      </View>
      <TouchableOpacity onPress={start ? onClickPauseBtn : onClickStartButton}>
        <Image source={start ? images.stop : images.start} style={appStyle.createButton} />
      </TouchableOpacity>
      {modalState && <View style={appStyle.modalView}>
          <ImageBackground style={appStyle.panelModal} source={images.popup}>
            <View style={appStyle.timeInput}>
              <TextInput
              style={appStyle.input}
              onChangeText={setTime}
              value={time.toString()}
              keyboardType="numeric"
              />
              <Text style={appStyle.labelText}>:</Text>
              <TextInput
              style={appStyle.input}
              onChangeText={setMinutes}
              value={minutes.toString()}
              keyboardType="numeric"
              />
              <Text style={appStyle.labelText}>:</Text>
              <TextInput
              style={appStyle.input}
              onChangeText={setSecond}
              value={second.toString()}
              keyboardType="numeric"
              />
            </View>
            <View style={appStyle.btnPanel}>
              <TouchableOpacity onPress={onClickOKButton}>
                <Image source={images.ok} style={appStyle.createButton} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onClickBackButton}>
                <Image source={images.backback} style={appStyle.createButton} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>}
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  logoImage: {
    width: windowWidth,
    height: windowWidth * 0.2,
    resizeMode: 'cover',
  },
  modalView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelModal: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  timeInput: {
    width: '80%',
    height: windowHeight * 0.15,
    paddingTop: windowHeight * 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnPanel: {
    width: '80%',
    height: windowHeight * 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  appBar: {
    flex: 0.1,
    paddingRight: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    marginRight: 10,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
    margin: 10,
  },
  scoreStyle: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
    margin: 8,
  },
  turnText: {
    fontSize: 30,
    fontFamily: 'REGISTER',
    color: 'white',
  },
  labelText1: {
    marginTop: 30,
    fontSize: 30,
    color: 'white',
    fontFamily: 'REGISTER',
  },
  labelText: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'REGISTER',
  },
  timeText: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'REGISTER',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  centerView: {
    flex: 0.8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
    paddingVertical: 20,
  },
  bottomView: {
    width: '100%',
    height: windowHeight * 0.1,
    position: 'absolute',
    bottom: '0%',
    left: '0%',
  },
  createButton: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  sunImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  earthImage: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.6,
    resizeMode: 'contain',
  },
});

export default HomeScreen;