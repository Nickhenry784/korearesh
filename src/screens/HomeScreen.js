import { View, StyleSheet, TouchableOpacity,Text, Dimensions, FlatList, Image, Alert, ImageBackground  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const numCol = 2;
const dataList = [{id: 1, image: images.v1},{id: 2, image: images.v2},{id: 3, image: images.v3},{id: 4, image: images.v4},{id: 5, image: images.v5},{id: 6, image: images.v6}, {id: 7, image: images.v7}, {id: 8, image: images.v8}  ];

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [priceItem, setPriceItem] = useState([]);
  const [showPrice, setShowPrice] = useState(false);
  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  useEffect(() => {
    const list = [];
    for (let index = 0; index < dataList.length; index++) {
      const element = getRandomNumberBetween(10,100);
      list.push(element);
    }
    setShowPrice(false);
    setPriceItem(list);
  },[isFocused]);

  const clickStartButton = () => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    const list = [];
    for (let index = 0; index < dataList.length; index++) {
      const element = {id: index + 1, price: priceItem[index]};
      list.push(element);
    }
    if(!showPrice){
      setShowPrice(true);
      setTimeout(() => {
        navigation.navigate('Play',{listPrice: list});
      }, 5000);
    }else{
      navigation.navigate('Play',{listPrice: list});
    }
    dispatch(decrement());
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <TouchableOpacity
        onPress={() => navigation.navigate("BUY")}>
        <View style={appStyle.turnView}>
          <Text style={appStyle.turnText}>{points.value}</Text>
          <Image source={images.buy} style={appStyle.buyImage}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setShowPrice(true)}>
        <ImageBackground source={images.shopvar} style={appStyle.shopImage}>
          <FlatList 
            data={dataList} 
            scrollEnabled={false}
            style={{marginTop: 20}}
            numColumns={numCol} 
            renderItem={({item, index}) => (<View style={appStyle.itemView} key={item.id}>
              {showPrice && <Text style={appStyle.itemText}>{`$${priceItem[index]}`}</Text>}
              <Image source={item.image} style={appStyle.itemImage} />
            </View>)} 
            />
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={clickStartButton}
        style={appStyle.buttonStyle}>
          <Image source={images.startbutton} style={appStyle.buttonStyle} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export const getRandomNumberBetween = (min,max) => {
  return Math.floor(Math.random()*(max-min+1)+min);
}


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  turnView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  turnText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  shopImage: {
    width: windowWidth * 0.7,
    height: windowWidth > 640 ? windowHeight * 0.7 : windowHeight * 0.6,
    resizeMode: 'contain',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: windowWidth > 640 ? 30 : 16,
    color: 'white',
    fontWeight: 'bold',
  },
  itemView: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.15,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  itemImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  textlabel: {
    marginTop: windowHeight * 0.1,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: windowHeight * 0.05,
  },
  buttonStyle: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    resizeMode: 'contain',
  }
});

export default Home;