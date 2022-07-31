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


const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const note = useSelector(state => state.note);
  
  const dispatch = useDispatch();

  const onClickStartButton = () => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Note", {
      note: null,
    });
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickNoteItem = (item) => {
    navigation.navigate("Note", {
      note: item,
    })
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg12}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.number_of_times_button} style={appStyle.scoreStyle} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
          <Image source={images.magnifying_glass_icon} style={appStyle.bullImage} />

      </View>
      <Text style={appStyle.labelText}>List Note:</Text>
      {note.length !== 0 && 
      <FlatList 
        data={note}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => onClickNoteItem(item)} style={{borderBottomWidth: 1, marginHorizontal: 10, width: windowWidth * 0.9}}>
            <View style={appStyle.titleView}>
              <Text style={appStyle.titleText}>Title:</Text>
              <Text style={appStyle.titleText}>{item.title}</Text>
            </View>
            <View style={appStyle.contentView}>
              <Text style={appStyle.titleText}>Content:</Text>
              <Text style={appStyle.titleText}>{item.noteText}</Text>
            </View>
          </TouchableOpacity>
        )}
      />}
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickStartButton()}>
          <Image source={images.plus_icon} style={appStyle.bullImage} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  titleText: {
    color: 'rgba(1,1,1,0.8)',
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleView: {
    width: windowWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
  },
  contentView: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
  },
  closeView: {
    position: 'absolute',
    top: '3%',
    right: '5%',
  },
  appBar: {
    height: windowHeight * 0.1,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  popupImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  popupView: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 1, 1, 0.7)',
    position: 'absolute',
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  okBtn: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  bottomView: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: windowWidth * 0.07,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerView: {
    flex: 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  turnView: {
    width: windowWidth * 0.15,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bullImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  startBtn: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    resizeMode: 'contain',
    margin: 10,
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  turnText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 30,
    paddingLeft: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Home;