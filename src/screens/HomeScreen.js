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

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const brokenData= [
  {id: 1, image: images.broken1},
  {id: 2, image: images.broken2},
  {id: 3, image: images.broken3},
  {id: 4, image: images.broken4},
  {id: 5, image: images.broken5},
  {id: 6, image: null},
];

const numCol = 2;

const HomeScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);

  const dispatch = useDispatch();

  const [itemBroken, setItemBroken] = useState(null);

  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickStartButton = () => {
    if(points.value <= 0){
      Alert.alert("Please buy more turn!");
      return false;
    }
    dispatch(decrement());
    if(itemBroken === null) {
      setItemBroken(brokenData[Math.floor(Math.random() * 4)]);
    }
    navigation.navigate("Play", {
      image: itemBroken.image,
    });
  }

  const onClickItemButton = (item) => {
    setItemBroken(item);
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <Image source={images.shop} style={appStyle.buyImage} />
        </TouchableOpacity>
        <View style={appStyle.turnView}>
          <Image source={images.turn} style={appStyle.buyImage} />
          <Text style={appStyle.turnText}>{points.value}</Text>
        </View>
      </View>
      <View style={appStyle.centerView}>
        <Image source={images.phone} style={appStyle.phoneImage} />
        <FlatList 
          data={brokenData}
          scrollEnabled={false}
          numColumns={numCol}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onClickItemButton(item)}>
              <View style={appStyle.itemView}>
                {item.image === null ? <Text style={appStyle.text}>Random</Text> : <Image source={item.image} style={appStyle.brokenImage} />}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity onPress={onClickStartButton}>
        <Image source={images.play} style={appStyle.brokenImage} />
      </TouchableOpacity>
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
  appBar: {
    flex: 0.1,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    marginRight: 10,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'white',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  brokenImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  itemView: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    resizeMode: 'contain',
    backgroundColor: 'rgba(0,0,0,0.5)',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'white',
  },
  centerView: {
    flex: 0.9,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  phoneImage: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.7,
    resizeMode: 'contain',
    position: 'absolute',
    top: '0%',
  },
});

export default HomeScreen;