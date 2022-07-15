import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions, 
  ImageBackground, 
  Image,
  FlatList, 
  Alert,  
  ScrollView} from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const dataButton = [
  {id: 0, image: images.background}, 
  {id: 1, image: images.babysleep}, 
  {id: 2, image: images.camera}, 
  {id: 3, image: images.clothesbaby}, 
  {id: 4, image: images.sleep2}
];

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);

  const onClickStartButton = (item) => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    if(index === 0){
      dispatch(decrement());
      setIndex(index + 1);
    } else if(index === 4){
      setIndex(0);
    } else{
      setIndex(index + 1);
    }
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return index === 0 ? 
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.shoppingicon} style={appStyle.scoreStyle} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={appStyle.labelText}>CHILD CARE EXPERIENCE</Text>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickStartButton()}>
          <Image source={images.buttonnext} style={appStyle.successImage} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  : <View style={appStyle.homeView}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Image style={appStyle.image} source={dataButton[index].image} />
      </ScrollView>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickStartButton()}>
          <Image source={images.buttonnext} style={appStyle.successImage} />
        </TouchableOpacity>
      </View>
    </View>;
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'contain',
  },
  appBar: {
    paddingTop: 10,
    flex: 0.1,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bottomView: {
    height: windowHeight * 0.2,
    position: 'absolute',
    bottom: '0%',
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreStyle: {
    height: windowWidth * 0.1,
    width: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  successImage: {
    height: windowWidth * 0.2,
    width: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  image: {
    height: windowHeight * 1.1,
    width: windowWidth,
    resizeMode: 'cover',
  },
  turnView: {
    width: windowWidth * 0.15,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnText: {
    fontSize: 30,
    color: '#0a98c9',
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 40,
    color: '#0a98c9',
    fontWeight: 'bold',
  }
});

export default Home;