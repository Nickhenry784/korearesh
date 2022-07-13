import { 
  StyleSheet, 
  View, Dimensions, 
  FlatList,
  Image,
  ImageBackground,  
  TouchableOpacity} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


const ItemScreen = ({navigation, route}) => {

  const {value} = route.params;

  const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  const numCol = 5;

  const onClickBackBtn = () => {
      navigation.goBack();
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={backgroundStyle(value.background)}>
        <FlatList 
          data={data}
          scrollEnabled={false}
          numColumns={numCol}
          renderItem={({item}) => (
            <Image key={item} source={item % 2 === 0 ? value.attribute1 : value.attribute2} style={appStyle.itemImage} />
          )}
        />
      </View>
      <TouchableOpacity onPress={() => onClickBackBtn()}>
        <Image style={appStyle.welcomeImage} source={images.backblue} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export const backgroundStyle = (color) => StyleSheet.create({
  backgroundColor: color,
  width: windowWidth * 0.6,
  height: windowWidth * 0.8,
  borderRadius: 4,
  marginTop: 20,
});

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  itemImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
    margin: 10,
  },
  welcomeImage: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  backBtn: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  bottomView: {
    width: '100%',
    height: windowHeight * 0.1,
    position: 'absolute',
    bottom: '0%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});

export default ItemScreen;