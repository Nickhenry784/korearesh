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

const ItemScreen = ({navigation, route}) => {


  const {background} = route.params;
  const [index, setIndex] = useState(0);

  const onClickNextBtn = () => {
    if(background.length !== index + 1){
      setIndex(index + 1)
    }
  }

  const onClickBackBtn = () => {
    if(background.length !== index + 1){
      setIndex(index - 1)
    } 
  }

  const onClickHomeBtn = () => {
    navigation.goBack();
  }

  return (
    <View style={appStyle.homeView}>
      <ScrollView style={{width: windowWidth}} contentContainerStyle={{alignItems: 'center'}}>
        <Image style={appStyle.imgBook} source={background[index]}/>
      </ScrollView>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickBackBtn()}>
          <Image source={images.back} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickHomeBtn()}>
          <Image source={images.home} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickNextBtn()}>
          <Image source={images.next} style={appStyle.btn} />
        </TouchableOpacity>
      </View>
    </View>
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
  imgBook: {
    width: windowWidth,
    height: windowHeight * 1.2,
    resizeMode: 'contain',
  },
  btn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default ItemScreen;