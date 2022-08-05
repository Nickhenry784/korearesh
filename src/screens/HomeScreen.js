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
  {id: 1, image: images.a1},
  {id: 2, image: images.a2},
  {id: 3, image: images.a3},
  {id: 4, image: images.a4},
  {id: 5, image: images.a5},
  {id: 6, image: images.a6},
  {id: 7, image: images.a7},
  {id: 8, image: images.a8},
  {id: 9, image: images.a9},
  {id: 10, image: images.a10},
  {id: 11, image: images.a11},
  {id: 12, image: images.a12},
  {id: 13, image: images.a13},
  {id: 14, image: images.a14},
  {id: 15, image: images.a15},
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const numCol = 5;

  const points = useSelector(state => state.points);

  const dispatch = useDispatch();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const [index, setIndex] = useState(1);

  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickStartButton = () => {
    if(image1 !== null && image2 !== null){
      navigation.navigate("Item", {
        item: [{id: 1, image: image1}, {id: 2, image: image2}],
      });
    }
    
  }

  const onClickAgainButton = () => {
    setImage1(null);
    setImage2(null);
  }

  const onClickItemBtn = (img) => {
    if(points.value <= 0){
      Alert.alert("Please buy more turn!");
      return false;
    }
    dispatch(decrement());
    if(index === 1){
      setImage1(img);
      setIndex(2);
    }else{
      setImage2(img);
      setIndex(1);
    }
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background1}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.buyturn} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image source={images.crow} style={appStyle.labelImage} />
      <View style={appStyle.image1View}>
        {image1 !== null && (
          <Image source={image1} style={appStyle.img} />
        )}
      </View>
      <View style={appStyle.image2View}>
        {image2 !== null && (
          <Image source={image2} style={appStyle.img} />
        )}
      </View>
      <View style={appStyle.btnView}>
        <TouchableOpacity onPress={() => onClickStartButton()}>
          <Image source={images.play} style={appStyle.brokenImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickAgainButton()}>
          <Image source={images.reset} style={appStyle.brokenImage} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.centerView}>
        <FlatList 
          data={brokenData}
          scrollEnabled={false}
          numColumns={numCol}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onClickItemBtn(item.image)}>
              <Image source={item.image} style={appStyle.itemView} />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'contain',
  },
  image2View: {
    position: 'absolute',
    top: '20%',
    right: '20%',
  },
  btnView: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  appBar: {
    position: 'absolute',
    top: '3%',
    left: '3%',
  },
  image1View: {
    position: 'absolute',
    top: '20%',
    left: '20%',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'black',
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
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    margin: 10,
    resizeMode: 'contain',
  },
  text: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'white',
  },
  labelImage: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
  },
  centerView: {
    height: windowHeight * 0.35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
});

export default HomeScreen;