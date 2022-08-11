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
import { posData } from "../assets/pos";

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

  const {company} = route.params;
  const {address} = route.params;
  const {web} = route.params;
  const {email} = route.params;
  const {phone} = route.params;

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
        <Text style={textLabel(posData[index][0].x,posData[index][0].y,posData[index][0].size,posData[index][index].color)}>{company}</Text>
        <Text style={textLabel(posData[index][1].x,posData[index][1].y,posData[index][1].size,posData[index][1].color)}>{email}</Text>
        <Text style={textLabel(posData[index][2].x,posData[index][2].y,posData[index][2].size,posData[index][2].color)}>{phone}</Text>
        {index !== 4 && <Text style={textLabel(posData[index][3].x,posData[index][3].y,posData[index][3].size,posData[index][3].color)}>{address}</Text>}
        <Text style={textLabel(posData[index][4].x,posData[index][4].y,posData[index][4].size,posData[index][4].color)}>{web}</Text>
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

export const textLabel = (x, y, font, color) => StyleSheet.create({
  fontSize: font,
  fontWeight: 'bold',
  color: color,
  position: 'absolute',
  top: `${x}%`,
  left:`${y}%`,
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
  backg: {
    width: windowWidth,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#d3a869',
  },
  labelText1: {
    fontSize: 30,
    fontWeight: 'bold',
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
    position: 'absolute',
    bottom: '0%',
  },
  back: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
});

export default ItemScreen;