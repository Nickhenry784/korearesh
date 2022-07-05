import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions, 
  ImageBackground,
  Image, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const PlayScreen = ({navigation, route}) => {
  const {image} = route.params;
  const [positionImage, setPositionImage] = useState([]);
  const [clickState, setClickState] = useState(false);

  const handlePress = evt => {
    setClickState(true);
    const list = [...positionImage];
    list.push({
      top: evt.nativeEvent.locationY,
      left: evt.nativeEvent.locationX,
    });
    setPositionImage(list);
  };

  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <TouchableOpacity
        onPress={evt => handlePress(evt)}
        style={appStyle.playView}>
        {clickState &&
          positionImage.map((item, indexBrroken) => (
            <Image
              key={indexBrroken}
              source={image}
              style={brokenPlayImage(item.top, item.left)}
            />
          ))}
      </TouchableOpacity>
    </ImageBackground>
  );
};

export const brokenPlayImage = (x, y) =>
  StyleSheet.create({
    position: 'absolute',
    top: x,
    left: y,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  });


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  playView: {
    width: '100%',
    height: '100%',
  },
});

export default PlayScreen;