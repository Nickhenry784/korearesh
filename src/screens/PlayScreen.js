import { View, StyleSheet, TouchableOpacity,Text, Dimensions, FlatList, Image, Alert, ImageBackground  } from "react-native";
import React, {useEffect, useState} from 'react';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const numCol = 4;
const dataList = [{id: 1, image: images.v1},{id: 2, image: images.v2},{id: 3, image: images.v3},{id: 4, image: images.v4},{id: 5, image: images.v5},{id: 6, image: images.v6}, {id: 7, image: images.v7}, {id: 8, image: images.v8}  ];

const Home = ({navigation, route}) => {
  const {listPrice} = route.params;
  const [time, setTime] = useState(10);
  const [index, setIndex] = useState(null);
  const [id, setId] = useState(null);
  const [score, setScore] = useState(0);
  const [play, setPlay] = useState(true);
  const [randomPrice, setRandomPrice] = useState(getRandomNumberBetween(0,7));

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(play && time > 0) {
        setTime(time - 1);
      }
      if(play && time === 0){
        if(id === listPrice[randomPrice].id){
          setScore(score + 10);
          setRandomPrice(getRandomNumberBetween(0,7));
          setTime(10);
          setId(null);
          setIndex(null);
        }else{
          setPlay(false);
        }
        clearTimeout(timeOut);
      }
    }, 1000);
    return() => {
      clearTimeout(timeOut);
    }
  },[time]);

  const clickOkeButton = () => {
    setId(index);
    setTime(0);
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.turnView}>
          <Text style={appStyle.turnText}>{`Score: ${score}`}</Text>
      </View>
      <Text style={appStyle.timeText}>{`${time}s`}</Text>
      <Text style={appStyle.priceText}>{`$${listPrice[randomPrice].price}`}</Text>
      <Text style={appStyle.label}>CHOOSE YOUR ANSWER</Text>
      <FlatList 
        data={dataList} 
        scrollEnabled={false}
        style={{marginTop: 20}}
        numColumns={numCol} 
        renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => setIndex(item.id)}
          style={itemStyle(item.id, index)}>
          <Image source={item.image} style={appStyle.itemImage} />
        </TouchableOpacity>)} 
        />
      <TouchableOpacity
        onPress={() => clickOkeButton()}
        style={appStyle.buttonStyle}>
          <Image source={images.ok} style={appStyle.buttonStyle} />
      </TouchableOpacity>
      {!play && <View style={appStyle.scoreView}>
          <ImageBackground source={images.yourscore} style={appStyle.scoreImage}>
            <TouchableOpacity
              onPress={() => navigation.goBack()} style={appStyle.exitButton}>
              <Image source={images.close} style={appStyle.exitImage} />
            </TouchableOpacity>
            <Text style={appStyle.priceText}>{`Your Score: ${score}`}</Text>
          </ImageBackground>
      </View>}
    </ImageBackground>
  );
};

export const getRandomNumberBetween = (min,max) => {
  return Math.floor(Math.random()*(max-min+1)+min);
}

export const itemStyle = (a,b) =>  StyleSheet.create({
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    margin: 10,
    borderColor: 'black',
    borderWidth: a === b  ? 5 : 0,
});


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
    justifyContent: 'flex-start',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 50 : 30,
    fontWeight: 'bold',
    color: 'black',
  },
  exitButton: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    position: 'absolute',
    top: '5%',
    right: '0%',
  },
  exitImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  scoreView: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: windowWidth > 640 ? 70 : 50,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  scoreImage: {
    width: windowWidth * 0.7,
    height: windowWidth > 640 ? windowHeight * 0.5 : windowHeight * 0.4,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    fontSize: windowWidth > 640 ? 60 : 40,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  label: {
    fontSize: windowWidth > 640 ? 50 : 30,
    marginVertical: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  itemImage: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    resizeMode: 'contain',
  },
  buttonStyle: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  }
});

export default Home;