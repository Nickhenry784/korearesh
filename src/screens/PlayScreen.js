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
  const [minutesCoutdown, setMinutesCoutdown] = useState(0);
  const [secondsCoutdown, setSecondsCoutdown] = useState(60);
  const [doubleClick, setDoubleClick] = useState(false);
  const [result, setResult] = useState(null);
  const [popup,setPopup] = useState(false);
  const [win, setWin] = useState(true); 
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
    if (result.id + 1 === value.id || result.id - 1 === value.id) {
      setScore(score + 10);
    } else {
      if(heart !== 0){
        setHeart(heart - 1);
      }
      list[indexOld.current] = false;
      list[index] = false;
    }
    if (heart === 0) {
      setPopup(true);
      setWin(false);
    }
    if (score === 70) {
      setPopup(true);
      setWin(true);
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
        {startGameState.length === 0 && (
          <ImageBackground source={images.time} style={appStyle.timeImage}>
            <Text style={appStyle.timeText}>
              {`${minutesCoutdown} : ${secondsCoutdown}`}
            </Text>
          </ImageBackground>
        )}
        <View style={appStyle.labelView}>
          <ImageBackground style={appStyle.labelImage} source={images.label}>
            <FlatList
            data={data}
            numColumns={num}
            style={{marginTop: 50,}}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => onClickIconImage(item, index)}
                disabled={
                  startGameState.length === 0 ? true : startGameState[index]
                }>
                {startGameState.length === 0 ? (
                  <Image source={item.image} style={appStyle.iconImage} />
                ) : (
                  <Image
                    source={
                      startGameState[index] ? item.image : images.button
                    }
                    style={appStyle.iconImage}
                  />
                )}
              </TouchableOpacity>
            )}
            />
          </ImageBackground>
        </View>
        <View style={appStyle.bottomView}>
          {startGameState.length === 0 ? (
            <TouchableOpacity
              onPress={onClickOKButton}>
              <Image source={images.play} style={appStyle.startImage} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.goBack()}>
              <Image source={images.home} style={appStyle.startImage} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {
        popup && <View style={appStyle.popupView}>
          <Image source={win ? images.girlHappy : images.girlSad} style={appStyle.girlImage} />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.return} style={appStyle.startImage} />
          </TouchableOpacity>
        </View>
      }
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
  popupView: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
    backgroundColor: 'rgba(1,1,1,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  girlImage: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.5,
    resizeMode: 'contain',
  },
  labelView: {
    width: windowWidth,
    height: windowHeight * 0.5,
    position: 'absolute',
    top: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelImage: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.6,
    resizeMode: 'contian',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBar: {
    flex: 0.1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bottomView: {
    position: 'absolute',
    bottom: '5%',
  },
  timeImage: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
  },
  iconImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  startImage: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
});

export default PlayScreen;