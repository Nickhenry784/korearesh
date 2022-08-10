import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataBg = [
  {id: 1, bg: images.bg2},
  {id: 2, bg: images.bg3},
  {id: 3, bg: images.bg4},
  {id: 4, bg: images.bg5},
  {id: 5, bg: images.bg6},
];


const ItemScreen = ({navigation, route}) => {

  const [text, setText] = useState(randomIntFromInterval(1,20));
  const [index, setIndex] = useState(randomIntFromInterval(0,4));
  const [score, setScore] = useState(0);
  const [listItem, setListItem] = useState(handleListItem(text));
  const [number, onChangeNumber] = useState(null);
  const [popup, setPopup] = useState(false);
  
  useEffect(() => {
    setListItem(handleListItem(text));
  },[text])

  const handleClickCheckBtn = () => {
    if(number.toString() === text.toString()){
      setScore(score + 10);
      setText(randomIntFromInterval(1,20));
      onChangeNumber(null);
      setIndex(randomIntFromInterval(0,4));
    }else{
      setPopup(true);
    }
  }

  const handleClickRePlayBtn = () => {
    setScore(0);
    setText(randomIntFromInterval(1,20));
    onChangeNumber(null);
    setIndex(randomIntFromInterval(0,4));
    setPopup(false);
  }

  return (
    <ImageBackground style={appStyle.homeView} source={dataBg[index].bg}>
      <View style={appStyle.closeView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.false} style={appStyle.btnClose} />
        </TouchableOpacity>
        <Text style={appStyle.scoreText}>{`Score: ${score}`}</Text>
      </View>
      <View style={appStyle.centerView}>
        {
          listItem.map((item) =>
            <View style={randomPos(item[0],item[1])} key={item}> 
              <Image source={images.pig} style={appStyle.pigImage} key={item}/>
            </View>
          )
        }
      </View>
      <View style={appStyle.bottomView}>
        <TextInput
          style={appStyle.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="text here"
          keyboardType="numeric"
          onEndEditing={() => handleClickCheckBtn()}
        />
      </View>
      {popup && (
        <View style={appStyle.popupView}>
          <ImageBackground style={appStyle.popupImage} source={images.score}>
            <Text style={appStyle.scoreText}>{score}</Text>
            <View style={appStyle.popupBottomView}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={images.home} style={appStyle.okBtn} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleClickRePlayBtn()}>
                <Image source={images.replay} style={appStyle.okBtn} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>)}
    </ImageBackground>
  );
};

export const handleListItem = (lenght) => {
  var list = [];
  for (let index = 0; index < lenght; index++) {
    list.push([randomIntFromInterval(0,50),randomIntFromInterval(0,90)]);
  }
  return list;
}

export const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomPos = (posx,posy) => StyleSheet.create({
  position: 'absolute',
  top: `${posx}%`,
  left: `${posy}%`,
});
export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  okBtn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  popupBottomView: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  popupImage: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pigImage: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
  },
  input: {
    height: 60,
    backgroundColor: 'white',
    width: windowWidth * 0.7,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 30,
    fontFamily: 'fengardo-neue.regular',
    color: 'black',
  },
  closeView: {
    width: windowWidth,
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    position: 'absolute',
    top: '0%',
  },
  centerView: {
    width: windowWidth,
    height: windowHeight * 0.3,
  },
  labelText: {
    fontSize: 120,
    fontFamily: 'fengardo-neue.regular',
    color: 'black',
  },
  label: {
    fontSize: 30,
    fontFamily: 'fengardo-neue.regular',
    color: 'black',
    marginVertical: 20,
  },
  scoreText: {
    fontSize: 30,
    fontFamily: 'fengardo-neue.regular',
    color: 'black',
  },
  btnClose: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  btn: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ItemScreen;