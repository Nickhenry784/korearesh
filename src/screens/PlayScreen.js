import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  Text,
  FlatList} from "react-native";
import React, {useEffect, useState, useRef} from 'react';
import { images } from "../assets/images";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const PlayScreen = ({navigation, route}) => {

  const {data} = route.params;
  const {max} = route.params;
  const [score, setScore] = useState(0);
  const [heart, setHeart] = useState(3);
  const [minutesCoutdown, setMinutesCoutdown] = useState(0);
  const [secondsCoutdown, setSecondsCoutdown] = useState(10);
  const [listResult, setListResult] = useState(data);
  const [end, setEnd] = useState(0);
  const num = 6;

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (secondsCoutdown > 0) {
        setSecondsCoutdown(secondsCoutdown - 1);
      }
      if (secondsCoutdown === 0 && minutesCoutdown === 0) {
        handelSecondsCoutdown();
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [secondsCoutdown, minutesCoutdown]);


  const handelSecondsCoutdown = () => {
    const list = [...data];
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      element.display = false;
    }
    setListResult([...list]);
  }

  const handleClickItem = (item,ind) => {
    const list = [...data];
    list[ind].display = true;
    if(heart === 0){
      navigation.goBack();
      return false;
    }
    if(item.image === 10){
      setHeart(heart - 1);
    }else if(item.image=== 11){
      setScore(score + 10);
      setEnd(end + 1);
    }
    if(end >= max){
      navigation.goBack();
      return false;
    }
    setListResult([...list]);
  }

  return (
    <ImageBackground source={images.bg1} style={appStyle.homeView}>
      <View style={appStyle.appBar}>
        <Text style={appStyle.turn}>
          SCORE:
          {score}
        </Text>
        <Text style={appStyle.turn}>
            HEART:
            {heart}
        </Text>
      </View>
      <View style={appStyle.centerView}>
        <Text style={appStyle.timeText}>
          {`0${minutesCoutdown} : ${secondsCoutdown >= 10 ? secondsCoutdown : `0${secondsCoutdown}`}`}
        </Text>
        <FlatList
          data={listResult}
          numColumns={num}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleClickItem(item,index)}
              disabled={item.display}
            >
              <ImageBackground source={images.khung} style={appStyle.iconButton}>
                {item.display && <Image source={item.image} style={appStyle.iconImage} />}
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.home} style={appStyle.okBtn} />
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
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  bottomView: {
   height: windowHeight * 0.2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '0%',
  },
  appBar: {
    flex: 0.1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  turn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  centerView: {
    flex: 0.9,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  timeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 20,
  },
  iconButton: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
    resizeMode: 'contain',
  },
  startImage: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  okBtn: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
});

export default PlayScreen;