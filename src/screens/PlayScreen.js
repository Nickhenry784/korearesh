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
  const [startGameState, setStartGameState] = useState([]);
  const [score, setScore] = useState(0);
  const [heart, setHeart] = useState(3);
  const [minutesCoutdown, setMinutesCoutdown] = useState(2);
  const [secondsCoutdown, setSecondsCoutdown] = useState(60);
  const [doubleClick, setDoubleClick] = useState(false);
  const [result, setResult] = useState(null);
  const num = 4;
  const indexOld = useRef(-1);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (secondsCoutdown > 0) {
        setSecondsCoutdown(secondsCoutdown - 1);
      }
      if (secondsCoutdown === 0 && minutesCoutdown > 0) {
        setMinutesCoutdown(minutesCoutdown - 1);
        setSecondsCoutdown(60);
      }
      if (secondsCoutdown === 0 && minutesCoutdown === 0) {
        onClickOKButton();
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [secondsCoutdown, minutesCoutdown]);

  const onClickIconImage = (value, index) => {
    const list = [...startGameState];
    list[index] = true;

    if (!doubleClick) {
      indexOld.current = index;
      setResult(value);
      setDoubleClick(true);
      setStartGameState(list);
      return false;
    }
    if (result.id === value.id) {
      setScore(score + 10);
    } else {
      setHeart(heart - 1);
      list[indexOld.current] = false;
      list[index] = false;
    }
    if (heart === 0) {
      navigation.goBack();
    }
    if (score === 110) {
      navigation.goBack();
    }
    setDoubleClick(false);
    setResult(null);
    setStartGameState(list);
  };

  const onClickOKButton = () => {
    setMinutesCoutdown(0);
    setSecondsCoutdown(0);
    const list = [...startGameState];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < data.length; index++) {
      list.push(false);
    }
    setStartGameState(list);
  };
  return (
    <ImageBackground source={images.bg} style={appStyle.homeView}>
      <View style={appStyle.appBar}>
        <Text style={appStyle.turn}>
          SCORE:
          {score}
        </Text>
        {startGameState.length !== 0 && (
          <Text style={appStyle.turn}>
            HEART:
            {heart}
          </Text>
        )}
      </View>
      <View style={appStyle.centerView}>
        <Image source={images.quickandquick} style={appStyle.quickImage} />
        {startGameState.length === 0 && (
          <ImageBackground source={images.time} style={appStyle.timeImg}>
            <Text style={appStyle.timeText}>
              {`${minutesCoutdown} : ${secondsCoutdown}`}
            </Text>
          </ImageBackground>
        )}
        <FlatList
          data={data}
          numColumns={num}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onClickIconImage(item, index)}
              onLongPress={() => onClickIconImage(item, index)}
              disabled={
                startGameState.length === 0 ? true : startGameState[index]
              }>
              {startGameState.length === 0 ? (
                <Image source={item.image} style={appStyle.iconImage} />
              ) : (
                <Image
                  source={
                    startGameState[index] ? item.image : images.question
                  }
                  style={appStyle.iconImage}
                />
              )}
            </TouchableOpacity>
          )}
        />
        {startGameState.length === 0 && (
          <TouchableOpacity
            onPress={onClickOKButton}
            onLongPress={onClickOKButton}>
            <Image source={images.ok} style={appStyle.startImage} />
          </TouchableOpacity>
        )}
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
  timeImg: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.05,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
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
    fontSize: 30,
    color: 'blue',
    fontFamily: 'Mat Saleh',
    textAlign: 'center',
  },
  centerView: {
    flex: 0.9,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  timeText: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'Mat Saleh',
    textAlign: 'center',
  },
  iconImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  startImage: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
});

export default PlayScreen;