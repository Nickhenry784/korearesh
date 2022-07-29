import { 
  StyleSheet, 
  View, 
  Dimensions, 
  Image, 
  ImageBackground,
  TouchableOpacity,
  Animated,
  Text} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";
import Sound from 'react-native-sound';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

var whoosh = new Sound('amthanh.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  whoosh.setVolume(1);
});


const dataBg = [
  {id: 1, bg: images.ball},
  {id: 2, bg: images.fireball},
  {id: 3, bg: images.grassball},
  {id: 4, bg: images.iceball},
  {id: 5, bg: images.suprememagicball},
  {id: 6, bg: images.thunderball},
  {id: 7, bg: images.windball},
]

const PlayScreen = ({navigation, route}) => {

  const [bottom, setBottom] = useState(20);
  const [left, setLeft] = useState(40);
  const [click, setClick] = useState(false);
  const [time, setTime] = useState(10);
  const [bodyImg, setbodyImg] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(time !== 0 && click){
        whoosh.play();
        setTime(time - 1);
        setBottom(bottom + 10);
        if(Math.floor(Math.random() * 2) === 0){
          setLeft(50)
        }else if(Math.floor(Math.random() * 2) === 0){
          setLeft(30)
        }else{
          setLeft(40);
        }
      }
      if(time === 0 && click){
        whoosh.stop();
        if(left === 40){
          setScore(score + 10);
          setbodyImg(true);
        }
        setClick(false);
        setTimeout(() => {
          setBottom(20);
          setbodyImg(false);
          setTime(10);
          setLeft(40);
        }, 2000)
      }
    }, 100);
    return() => {
      clearTimeout(timeOut);
    }
  }, [time, click]);


  return (

    <ImageBackground style={appStyle.homeView} source={images.bg1}>
        <View style={appStyle.closeview}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.butotnback} style={appStyle.btnReturn} />
          </TouchableOpacity>
        </View>
        <Text style={appStyle.textScore}>{score}</Text>
        <View style={appStyle.bottomView}>
          <Image source={bodyImg? images.bogy2 : images.bogy1} style={[appStyle.btn,{position: 'absolute', bottom: '80%'}]} />
          <Animated.Image source={images.wind} style={[appStyle.btn,{position: 'absolute', bottom: `${bottom} %`,left: `${left}%`}]}/>
          <TouchableOpacity onPress={() => setClick(true)}>
            <Image source={click ? images.human2 : images.human1} style={appStyle.btn} />
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
    width: windowWidth * 0.2,
    height: windowWidth * 0.3,
    resizeMode: 'contain',
  },
  btnReturn: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  textScore: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 100,
  },
  centerView: {
    width: windowWidth,
    height: windowHeight * 0.8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  ballView: {
    position: 'absolute',
    top: '30%',
    alignItems: 'center',
  },
});

export default PlayScreen;