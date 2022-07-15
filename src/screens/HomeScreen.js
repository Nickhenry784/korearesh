import { View, StyleSheet, TouchableOpacity,Text, Dimensions, FlatList, Image, Alert, ImageBackground, ScrollView  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

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
      const element = {id: index + 1,result: priceItem[index], price: [priceItem[index],getRandomNumberBetween(10,100), getRandomNumberBetween(10, 100), getRandomNumberBetween(10,100)]};
      for (let i = 0; i < element.price.length; i++) {
        const random = getRandomNumberBetween(0,3);
        const el = element.price[i];
        element.price.splice(i,1);
        element.price.splice(random,0,el);
      }
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
      <Text style={appStyle.labelText}>Menu Memory</Text>
      <Image source={images.e4} style={appStyle.e4Image}/>
      <Image source={images.e3} style={appStyle.e3Image} />
      <Image source={images.e1} style={appStyle.e1Image} />
      <Image source={images.e2} style={appStyle.e2Image} />
      <ImageBackground source={images.frame} style={appStyle.frameImage}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {dataList.map((item, index) => (
          <View style={appStyle.itemView} key={item.id} >
            <Text style={appStyle.itemText} >{item.name}</Text>
            {showPrice && <Text style={appStyle.priceText} >{`$${priceItem[index]}`}</Text>}
          </View>
          
        ))}
        <TouchableOpacity
          onPress={clickStartButton}
          style={appStyle.buttonStyle}>
            <Image source={images.play} style={appStyle.buttonStyle} />
        </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
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
    color: 'white',
  },
  e4Image: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
    position: 'absolute',
    top: '10%',
    right: '0%',
  },
  e3Image: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
    position: 'absolute',
    top: '30%',
    left: '0%',
  },
  e1Image: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
    position: 'absolute',
    top: '50%',
    left: '0%',
  },
  e2Image: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
    position: 'absolute',
    top: '70%',
    left: '10%',
  },
  frameImage: {
    width: windowWidth * 0.43,
    height: windowHeight * 0.63,
    resizeMode: 'cover',
    position: 'absolute',
    top: '30%',
    right: '5%',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    width: windowWidth * 0.3,
  },
  priceText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
    width: '50%',
    textAlign: 'center',
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth * 0.4,
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