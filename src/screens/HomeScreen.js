import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions, 
  ImageBackground, 
  Image,
  FlatList, 
  Alert,  
  TextInput} from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";
import Sound from 'react-native-sound';
import { SafeAreaInsetsContext } from "react-native-safe-area-context";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;



const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const [popup, setPopup] = useState(false);
  const [text, onChangeText] = useState("");

  const onClickStartButton = () => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    if(text === ''){
      navigation.navigate('Call',{ value: "Unknown"});
    }else{
      navigation.navigate('Call',{ value: text});
    }
    
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.turn} style={appStyle.scoreStyle} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPopup(true)}>
          <Image source={images.note} style={appStyle.buyImage} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.textView}>
        <Image source={images.namephone} style={appStyle.okBtn} />
        <TextInput
          style={appStyle.input}
          onChangeText={onChangeText}
          placeholder={"Text Here!"}
          placeholderTextColor={'rgba(255,255,255,0.7)'}
          value={text}
        />
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickStartButton()}>
          <Image source={images.callme} style={appStyle.bullImage} />
        </TouchableOpacity>
      </View>
      {popup && (
      <View style={appStyle.popupView}>
        <ImageBackground style={appStyle.popupImage} source={images.bangnote}>
          <TouchableOpacity onPress={() => setPopup(false)}>
            <Image source={images.OK} style={appStyle.okBtn} />
          </TouchableOpacity>
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
  input: {
    height: 40,
    margin: 12,
    width: windowWidth * 0.8,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: 'rgba(255,255,255,0.7)',
    color: 'rgba(255,255,255,0.7)',
  },
  textView: {
    position: 'absolute',
    top: '15%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(1,1,1,0.3)'
  },
  popupImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
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
    width: windowWidth * 0.3,
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
    color: 'white',
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Home;