import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  Text} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataBg = [
  {id: 1, bg: images.card1},
  {id: 2, bg: images.card2},
  {id: 3, bg: images.card3},
  {id: 4, bg: images.card4},
  {id: 5, bg: images.card5},
]

const ItemScreen = ({navigation, route}) => {

  const {male} = route.params;
  const {address} = route.params;
  const {date} = route.params;

  const [index, setIndex] = useState(0);

  const onClickNextBtn = () => {
    if(index !== 4){
      setIndex(index + 1);
    }
  }

  const onClickBackBtn = () => {
    if(index !== 0){
      setIndex(index - 1);
    }
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <View style={{position: 'absolute', top: '0%', left: '2%'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.home} style={appStyle.back} />
        </TouchableOpacity>
      </View>
      <ImageBackground source={dataBg[index].bg} style={appStyle.backg}>
        {index === 2 ? <View style={{position: 'absolute', right: '40%', height: windowHeight * 0.8}}>
          <Text style={[appStyle.labelText, {position: 'absolute', top: index !== 4 && index !== 3 ? '25%' : '50%' }]}>{male}</Text>
          <Text style={[appStyle.labelText1, {position: 'absolute', top: index !== 4 && index !== 3 ? '40%' : '65%'}]}>{date}</Text>
          <Text style={[appStyle.labelText1, {position: 'absolute', top: index !== 4 && index !== 3 ? '50%' : '75%'}]}>{address}</Text>
        </View> : (<>
          <Text style={[appStyle.labelText, {position: 'absolute', top: index !== 4 && index !== 3 ? '25%' : '50%' }]}>{male}</Text>
          <Text style={[appStyle.labelText1, {position: 'absolute', top: index !== 4 && index !== 3 ? '40%' : '65%'}]}>{date}</Text>
          <Text style={[appStyle.labelText1, {position: 'absolute', top: index !== 4 && index !== 3 ? '50%' : '75%'}]}>{address}</Text>
          </>
        )}
      </ImageBackground>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickBackBtn()}>
          <Image source={images.back} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickNextBtn()}>
          <Image source={images.next} style={appStyle.btn} />
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
  backg: {
    width: windowWidth,
    height: windowHeight * 0.7,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 50,
    fontFamily: 'Belligo',
    color: '#d3a869',
  },
  labelText1: {
    fontSize: 30,
    fontFamily: 'Belligo',
    color: '#d3a869',
  },
  btn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  back: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
});

export default ItemScreen;