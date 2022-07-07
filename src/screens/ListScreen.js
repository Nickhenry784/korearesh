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
import { ScrollView } from "react-native-gesture-handler";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const dataButton = [
  {id: 1, image: images.boatpose, label: 'Boat Pose', background: images.boatposetext}, 
  {id: 2, image: images.bridgepose, label: 'Bridge Pose', background: images.bridgeposetext}, 
  {id: 3, image: images.camelpose, label: 'Camel Pose', background: images.camelposetext}, 
  {id: 4, image: images.dencerpose, label: 'Dencer Pose', background: images.dencerposetext},
  {id: 5, image: images.extendedsideanglepose, label: 'Extended Side Angle Pose', background: images.extendedsideangleposetext},  
  {id: 6, image: images.headstand, label: 'Headstand', background: images.headstandtext}, 
  {id: 7, image: images.oneleggedsideplankpose, label: 'One-legged Side Plank Pose', background: images.oneleggedsideplankposetext},
  {id: 8, image: images.plowpose, label: 'Plow Pose', background: images.plowposetext}, 
  {id: 9, image: images.treepose, label: 'Tree Pose', background: images.treeposetext}, 
  {id: 10, image: images.warriorposes, label: 'Warrior Pose', background: images.warriorposestext},  
];

const ListScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const onClickStartButton = (item) => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Item", {background: item});
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickBackButton = () => {
    navigation.goBack();
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <View style={appStyle.appBar}>
          <TouchableOpacity onPress={onClickTurnButton}>
            <View style={appStyle.turnView}>
              <Image source={images.logo114} style={appStyle.scoreStyle} />
              <Text style={appStyle.turnText}>{points.value}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList 
          data={dataButton}
          style={{marginTop:10}}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onClickStartButton(item.background)} key={item.id}>
              <View style={appStyle.itemView}>
                <Image source={item.image} style={appStyle.successImage} />
                <Text style={appStyle.itemText}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          )}
          />
        <TouchableOpacity onPress={onClickBackButton}>
          <Image source={images.back} style={appStyle.startBtn} />
        </TouchableOpacity>
      </ScrollView>
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
    resizeMode: 'contain',
  },
  appBar: {
    flex: 0.1,
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
  itemView: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection :'row',
    borderBottomWidth: 1,
    borderColor: 'red',
  },
  successImage: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
    marginRight: 20,
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  turnText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  startBtn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  itemText: {
    fontSize: 20,
    color: 'black',
  },
});

export default ListScreen;