import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Text,
  FlatList} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataBg = [
  {id: 1, bg: images.aphrodite, text: "aphrodite"},
  {id: 2, bg: images.apollo, text: "apollo"},
  {id: 3, bg: images.ares, text: "ares"},
  {id: 4, bg: images.artemis, text: "artemis"},
  {id: 5, bg: images.athena, text: "athena"},
  {id: 6, bg: images.demeter, text: "demeter"},
  {id: 7, bg: images.hades, text: "hades"},
  {id: 8, bg: images.hera, text: "hera"},
  {id: 9, bg: images.hermes, text: "hermes"},
  {id: 10, bg: images.poseidon, text: "poseidon"},
  {id: 11, bg: images.zeus, text: "zeus"},
]

const ItemScreen = ({navigation, route}) => {

  const [index, setIndex] = useState(randomIntFromInterval(0,dataBg.length - 1));
  const [text, onChangeText] = useState("");
  const [score, setScore] = useState(0);


  const onEndChangeText = () => {
    if(text.toLocaleLowerCase() === dataBg[index].text.toLocaleLowerCase()){
      setScore(score + 10);
      onChangeText("");
      setIndex(randomIntFromInterval(0,dataBg.length - 1));
      return () => {
        clearTimeout(timeOut);
      }
    }else{
      navigation.goBack();
    }
  }

  const makeUnique = (value)  => {
    var list = [];
    for (var i = 0; i < value.length; i++){
      const element = value.substring(i,i + 1);
      list.push(element);
    }
    for (let t = 0; t < list.length; t++) {
      const element = list[t];
      list.splice(t,1);
      list.splice(randomIntFromInterval(0,list.length),0,element);
    }
    return list;
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.false} style={appStyle.btnBack} />
        </TouchableOpacity>
        <Text style={appStyle.scoreText}>{`Score: ${score}`}</Text>
      </View>
      <ImageBackground source={images.square2} style={appStyle.square2}>
        <Image source={dataBg[index].bg} style={appStyle.foodImage} />
      </ImageBackground>
      
      <FlatList 
        data={makeUnique(dataBg[index].text)}
        style={{marginTop: 20}}
        horizontal={true}
        renderItem={({item}) => (
          <ImageBackground source={images.square3} style={appStyle.squareImage}>
            <Text style={appStyle.textLabel}>{item.toUpperCase()}</Text>
          </ImageBackground>
        )}
      />
      <View style={appStyle.bottomView}>
        <TextInput
          style={appStyle.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={"Text here"}
        />
        <TouchableOpacity onPress={() => onEndChangeText()}>
          <Image source={images.true} style={appStyle.btn} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  square2: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBar: {
    height: windowHeight * 0.1,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  squareImage: {
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    marginHorizontal: 10,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  bangImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  btn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  scoreView: {
    position: 'absolute',
    top: '5%',
    right: '10%',
  },
  input: {
    height: 60,
    width: windowWidth * 0.5,
    backgroundColor: 'white',
    margin: 12,
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  boardImage: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
  },
  boardView: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.3,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: '30%',
    left: '10%',
    transform: [{
      rotate: '-20deg',
    }]
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '0%',
    flexDirection: 'row',
  },
  foodImage: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
  },
  backBtn: {
    position: 'absolute',
    top: '3%',
    left: '3%'
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  btnBack: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
});

export default ItemScreen;