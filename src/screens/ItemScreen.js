import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  FlatList} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataStamp = [
  {id: 1, image: images.r1, hidden: false},
  {id: 2, image: images.r2, hidden: false},
  {id: 3, image: images.r3, hidden: false},
  {id: 4, image: images.r4, hidden: false},
  {id: 5, image: images.r5, hidden: false},
  {id: 6, image: images.r6, hidden: false},
  {id: 7, image: images.r7, hidden: false},
  {id: 8, image: images.r8, hidden: false},
  {id: 9, image: images.r9, hidden: false},
]

const ItemScreen = ({navigation, route}) => {

  const [listItem, setListItem] = useState(dataStamp);
  const [popup, setPopup] = useState(false);

  const onClickItemBtn = (val) => {
    const list = [...listItem];
    list[val].hidden = true;
    setListItem(list);
    var pop = 9;
    for (let index = 0; index < listItem.length; index++) {
      const element = listItem[index];
      if(element.hidden === true){
        pop -= 1;
      }
    }
    if(pop === 0){
      setPopup(true);
    }
  }

  const onClickReturnBtn = () => {
    setPopup(false);
    setListItem(dataStamp);
  }

  const onCliCkBackBtn = () => {
    navigation.goBack();
    for (let index = 0; index < listItem.length; index++) {
      const element = listItem[index];
      element.hidden = false;
    }
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <View style={appStyle.closeview}>
        <TouchableOpacity onPress={() => onCliCkBackBtn()}>
          <Image source={images.home} style={appStyle.btnReturn} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.topView}>
        <Image source={images.sun} style={{
          width: windowWidth * 0.3,
          height: windowWidth * 0.3,
          resizeMode: 'contain',
        }}/>
      </View>
      <View style={appStyle.centerView}>
        {
          dataStamp.map((item, index) => (
            <TouchableOpacity onPress={() => onClickItemBtn(index)} key={item.id}>
              {!listItem[index].hidden && <View style={randomPos(randomIntFromInterval(0,160), randomIntFromInterval(0, 90))}>
                <Image source={item.image} style={appStyle.itemImage} />
              </View>}
            </TouchableOpacity>
          ))
        }
      </View>
      {popup && (
      <View style={appStyle.popupView}>
        <ImageBackground style={appStyle.popupImage} source={images.done}>
          <View style={appStyle.popupBottomView}>
            <TouchableOpacity onPress={() => onCliCkBackBtn()}>
              <Image source={images.homee} style={appStyle.stampHigher} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickReturnBtn()}>
              <Image source={images.reset} style={appStyle.stampHigher} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>)}
    </ImageBackground>
  );
};

export const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomPos = (posx, posy) => StyleSheet.create({
  position: 'absolute',
  top: posx,
  left: `${posy} %`,
});

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  popupImage: {
    width: windowWidth,
    height: windowHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  popupBottomView: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  itemImage: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  closeview: {
    position: 'absolute',
    top: '0%',
    left: '3%',
  },
  centerView: {
    width: windowWidth,
    height: windowHeight * 0.3,
  },
  topView: {
    position: 'absolute',
    top: '5%',
    right: '10%',
  },
  stampHigher: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  stampSmall: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
  },
  btn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  btnReturn: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default ItemScreen;