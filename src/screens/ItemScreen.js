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
  {id: 1, question: "Home Fires are...", text: ["Loud,hot and dark","Quiet, hot and dark","Quiet,hot, and bright","Loud,cool and dark",], reulst: "Loud,hot and dark"},
  {id: 2, question: "When you hear a smoke alarm, you should..", text: ["Follow your escape plan and get out fast","Hide in your room","Gather you stuff before getting out","Call 9-1-1",], reulst: "Follow your escape plan and get out fast"},
  {id: 3, question: "How often should grown-ups should test smoke alarms?", text: ["Every day","Every month","Every week","Every year",], reulst: "Every month"},
  {id: 4, question: "A smoke alarm can tell if there is________ in the air.", text: ["Aust","Smoke","A bug","Pollution",], reulst: "Smoke"},
  {id: 5, question: "The best way to exit from a smoky place is to:", text: ["Run quickly but don't panic","Use the nearest stairs","Crawl on your hands and knees","Crawl on your stomach",], reulst: "Crawl on your hands and knees"},
  {id: 6, question: "Most serious burns are caused by:", text: ["Hot water","Flames","Chemicals","Electricity",], reulst: "Hot water"},
  {id: 7, question: "You should have at least ____ escape routes from each room in your house.", text: ["0","1","3","2",], reulst: "2"},
  {id: 8, question: "If your clothing catches on fire you should:", text: ["Run for help","Soak yourself in water","Try to put it out with your hands","Stop, drop and roll, while covering your face",], reulst: "Stop, drop and roll, while covering your face"},
  {id: 9, question: "If you burn yourself you should immediately put____ on it.", text: ["Butter","Warm water","Cold water","Ice",], reulst: "Cold water"},
  {id: 10, question: "If you cannot leave a room in a burning building you should:", text: ["Stuff a blanket under the closed door","Open the window and stay low as possible","Hang something out the window and yell for help","All of these answers",], reulst: "All of these answers"},
  {id: 11, question: "If a fire occurred in your home, the time you have to escape could be as little as:", text: ["1 minute","12 minutes","3 minutes","30 minutes",], reulst: "1 minute"},
  {id: 12, question: "What 3 things does a fire need to burn?", text: ["Oxygen","Fuel","Heat","All of these answers",], reulst: "All of these answers"},
]

const ItemScreen = ({navigation, route}) => {

  const [index, setIndex] = useState(randomIntFromInterval(0,dataBg.length - 1));
  const [score, setScore] = useState(0);


  const onEndChangeText = (val) => {
    if(val.toLocaleLowerCase() === dataBg[index].reulst.toLocaleLowerCase()){
      setScore(score + 10);
      setIndex(randomIntFromInterval(0,dataBg.length - 1));
    }else{
      navigation.goBack();
    }
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg2}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.home} style={appStyle.btnBack} />
        </TouchableOpacity>
        <Text style={appStyle.scoreText}>{`Score: ${score}`}</Text>
      </View>
      <ImageBackground source={images.question} style={appStyle.square2}>
        <Text style={appStyle.textLabel}>{dataBg[index].question}</Text>
      </ImageBackground>
      
      <View style={appStyle.bottomView}>
        <FlatList 
          data={randomAnswer(dataBg[index].text)}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onEndChangeText(item)}>
              <ImageBackground source={images.answer} style={appStyle.foodImage}>
                <Text style={appStyle.label}>{item}</Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomAnswer = (list) => {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    list.splice(index,1);
    list.splice(randomIntFromInterval(0,4),0,element);
  }
  return list;
}

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  textLabel: {
    fontSize: 30,
    fontFamily: 'Write Nice',
    color: 'white',
  },
  label: {
    fontSize: 20,
    fontFamily: 'Write Nice',
    color: 'white',
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
    paddingHorizontal: 30,
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
    width: windowWidth * 0.6,
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
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '0%',
  },
  inputView: {
    width: windowWidth * 0.9,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  foodImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: '3%',
    left: '3%'
  },
  scoreText: {
    fontSize: 25,
    fontFamily: 'Write Nice',
    color: 'black',
  },
  btnBack: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
});

export default ItemScreen;