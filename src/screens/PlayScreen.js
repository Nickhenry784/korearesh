import { View, StyleSheet, TouchableOpacity,Text, Dimensions, FlatList, Image, Alert, ImageBackground  } from "react-native";
import React, {useEffect, useState} from 'react';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";
import { useRef } from "react";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const dataList = [
  {id: 1, name: 'Tomato Soup'},
  {id: 2, name: 'French Onion Soup'},
  {id: 3, name: 'Tomato Salad'},
  {id: 4, name: 'Chicken Salad'},
  {id: 5, name: 'German sausage and chips'},
  {id: 6, name: 'Grilled fish and potatoes'}, 
  {id: 7, name: 'Italian cheese & Tomato pizza'}, 
  {id: 8, name: 'Thai chicken and rice'},
  {id: 9, name: 'Vegetable pasta'},  
  {id: 10, name: 'Snacks'},    
  {id: 11, name: 'Pizzas'},  
  {id: 12, name: 'Sandwiches'},
  {id: 13, name: 'Chicken saandwich'}, 
  {id: 14, name: 'Cheese omelette'},
  {id: 15, name: 'Meat pizza'},   
  {id: 16, name: 'Seafood pizza'},      
];

const numCol = 2;

const Home = ({navigation, route}) => {
  const {listPrice} = route.params;
  const [time, setTime] = useState(10);
  const [score, setScore] = useState(0);
  const [price, setPrice] = useState(0);
  const [play, setPlay] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(play && time > 0) {
        setTime(time - 1);
      }
      if(play && time === 0){
        if(index === 15){
          setPlay(false);
        }else{
          if(price === listPrice[index].result){
            setScore(score + 10);
            setTime(10);
            setIndex(index + 1);
          }else{
            setPlay(false);
          }
        }
        clearTimeout(timeOut);
      }
    }, 1000);
    return() => {
      clearTimeout(timeOut);
    }
  },[time]);

  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.turnView}>
          <Text style={appStyle.turnText}>{`Score: ${score}`}</Text>
      </View>
      <Text style={appStyle.timeText}>{`${time}s`}</Text>
      <Text style={appStyle.priceText}>{dataList[index].name}</Text>
      <Text style={appStyle.label}>CHOOSE YOUR ANSWER</Text>
      <FlatList 
        data={listPrice[index].price}
        scrollEnabled={false}
        numColumns={numCol}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => setPrice(item)}>
            <View style={appStyle.answerView}>
              <Text style={appStyle.price}>{`$ ${item}`}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {!play && <View style={appStyle.scoreView}>
          <ImageBackground source={images.popupwin} style={appStyle.scoreImage}>
            <TouchableOpacity
              onPress={() => navigation.goBack()} style={appStyle.exitButton}>
              <Image source={images.close} style={appStyle.exitImage} />
            </TouchableOpacity>
            <Text style={appStyle.price}>{`Your Score: ${score}`}</Text>
          </ImageBackground>
      </View>}
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
    justifyContent: 'flex-start',
  },
  turnText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
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
    width: windowWidth * 0.73,
    height: windowHeight * 0.6,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    fontSize: windowWidth > 640 ? 60 : 40,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  price: {
    fontSize: windowWidth > 640 ? 60 : 40,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  answerView: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 30,
    marginVertical: 40,
    fontWeight: 'bold',
    color: 'white',
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