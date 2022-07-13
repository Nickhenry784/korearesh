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
const dataBackground = [
  {id: 1, color: '#E8EBC2'}, 
  {id: 2, color: '#CFD6E2'}, 
  {id: 3, color: '#E16E79'}, 
  {id: 4, color: '#364EB9'},
  {id: 5, color: '#228FCF'},  
  {id: 6, color: '#17D5D1'}, 
];

const dataAttribute = [
  {id: 1, image: images.s1}, 
  {id: 2, image: images.s2}, 
  {id: 3, image: images.s4}, 
  {id: 4, image: images.s5},
  {id: 5, image: images.s6},  
  {id: 6, image: images.s7},
  {id: 7, image: images.s8}, 
  {id: 8, image: images.s9}, 
  {id: 9, image: images.s10}, 
  {id: 10, image: images.s11},
  {id: 11, image: images.s12},  
  {id: 12, image: images.s13},  
  {id: 13, image: images.s14}, 
  {id: 14, image: images.s15}, 
  {id: 15, image: images.s16}, 
];

const numCol = 3;

const numCol1 = 5;

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();
  const [bg, setBg] = useState(null);
  const [attribute1, setAttribute1] = useState(null);
  const [attribute2, setAttribute2] = useState(null);
  const [index, setIndex] = useState(0);

  const onClickStartButton = (item) => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Item", {
      value: {
        background: bg,
        attribute1: attribute1,
        attribute2: attribute2,
      }
    });
  }

  const onClickAttributeBtn = (image) => {
    if(index === 0){
      setIndex(1);
      setAttribute1(image);
    } else{
      setIndex(0);
      setAttribute2(image);
    }
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.buy} style={appStyle.scoreStyle} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={appStyle.labelText}>Pattern Maker</Text>
      <Text style={appStyle.labelText1}>Select Background</Text>
      <FlatList
        data={dataBackground}
        scrollEnabled={false}
        numColumns={numCol}
        renderItem={({item}) => (
          <TouchableOpacity key={item.id} onPress={() => setBg(item.color)}>
            <View  style={backgroundStyle(item.color)} />
          </TouchableOpacity>
        )}
      />
      <Text style={appStyle.labelText1}>Select 2 Attribute</Text>
      <FlatList
        data={dataAttribute}
        scrollEnabled={false}
        numColumns={numCol1}
        renderItem={({item}) => (
          <TouchableOpacity key={item.id} onPress={() => onClickAttributeBtn(item.image)}>
            <Image source={item.image} style={appStyle.itemImage} />
          </TouchableOpacity>
        )}
      />
      <View style={appStyle.attributeView}>
          {attribute1 === null ? (<View style={backgroundStyle('#fff')} />) : (<Image source={attribute1} style={appStyle.itemImage} />)}
          {attribute2 === null ? (<View style={backgroundStyle('#fff')} />) : (<Image source={attribute2} style={appStyle.itemImage} />)}
      </View>
      <TouchableOpacity onPress={onClickStartButton}>
        <Image source={images.creat} style={appStyle.successImage} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export const backgroundStyle = (color) => StyleSheet.create({
  backgroundColor: color,
  width: windowWidth * 0.1,
  height: windowWidth * 0.1,
  borderRadius: 4,
  margin: 10,
});

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
    height: windowHeight * 0.05,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  turnView: {
    width: windowWidth * 0.15,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
    margin: 10,
  },
  successImage: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  turnText: {
    fontSize: 30,
    color: '#1862dd',
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 40,
    color: '#1862dd',
    fontWeight: 'bold',
    marginTop: 30,
  },
  labelText1: {
    fontSize: 20,
    color: '#1862dd',
    fontWeight: 'bold',
  },
  attributeView: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
  },
});

export default Home;