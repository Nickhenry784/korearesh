import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions, 
  ImageBackground,
  Image, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const PlayScreen = ({navigation, route}) => {
  const {listItem} = route.params;


  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [resultValue, setResultValue] = useState(null);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (time > 0){
        setTime(time - 1);
      }
      if(time === 0){
        if(index === 12){
          setTimeout(() => {
            navigation.goBack();
          },3000);
          return false;
        }
        if(resultValue === listItem[index].result){
          setScore(score + 10);
          setResult(true);
          setTimeout(() => {
            setTime(30);
            setIndex(index + 1);
            setResult(null);
          },2000);
        }else{
          setResult(false);
          setTimeout(() => {
            navigation.goBack();
          },3000);
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    }
  },[time]);

  const onClickStartButton = (item) => {
    setResultValue(item);
    setTime(0);
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <Text style={appStyle.scoreStyle}>{`SCORE: ${score}`}</Text>
      </View>
      <View style={appStyle.playView}>
        <View style={appStyle.createButton}>
          <Text style={appStyle.timeStyle}>{listItem[index].question}</Text>
        </View>
        <TouchableOpacity onPress={() => onClickStartButton(listItem[index].a)}>
          <View style={answerStyle(listItem[index].a, listItem[index].result, time)}>
              <Text style={appStyle.timeStyle}>{listItem[index].a}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickStartButton(listItem[index].b)}>
          <View style={answerStyle(listItem[index].b, listItem[index].result, time)}>
            <Text style={appStyle.timeStyle}>{listItem[index].b}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickStartButton(listItem[index].c)}>
          <View style={answerStyle(listItem[index].c, listItem[index].result, time)}>
            <Text style={appStyle.timeStyle}>{listItem[index].c}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickStartButton(listItem[index].d)}>
          <View style={answerStyle(listItem[index].d, listItem[index].result, time)}>
            <Text style={appStyle.timeStyle}>{listItem[index].d}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export const answerStyle = (value1, value2, time) => StyleSheet.create({
  width: windowWidth * 0.8,
  height: windowWidth * 0.15,
  resizeMode: 'contain',
  marginBottom: 20,
  paddingLeft: 20,
  paddingTop: 10,
  backgroundColor: time === 0 ? value1 === value2 ? 'green' : 'red' :'white',
  borderRadius: 4,
  borderColor: 'black',
  borderWidth: 2,
})

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  playView:{
    flex: 0.9,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  appBar: {
    flex: 0.1,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  turnView: {
    flexDirection: 'row',
    width: '80%',
    height: windowHeight * 0.1,
    backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreStyle: {
    fontSize: windowWidth > 640 ? 30 : 25,
    color: 'black',
    fontWeight: 'bold',
  },
  timeStyle: {
    fontSize: windowWidth > 640 ? 30 : 20,
    color: 'black',
    fontWeight: 'bold',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    color: 'blue',
    fontWeight: 'bold',
  },
  itemStyle: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    resizeMode: 'contain',
    position: 'absolute',
    top: '0%',
    left: '30%',
  },
  centerView: {
    marginTop: 20,
    flex: 0.85,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  createButton: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    paddingLeft: 30,
    paddingTop: 20,
    resizeMode: 'contain',
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 2,
  },
  backStyle: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.15,
    resizeMode: 'contain',
    marginBottom: 20,
    paddingLeft: 20,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 2,
  },
});

export default PlayScreen;